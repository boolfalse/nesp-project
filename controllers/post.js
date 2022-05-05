
const validate = require('./../validations/post');
const { Op } = require('sequelize');

const {
    Sequelize,
    Category,
    User,
    PostTag,
    Tag,
    Post,
} = require('./../models');



module.exports = {
    list: async (req, res) => {
        const validationResult = validate.list(req.query);
        if (validationResult.error) {
            return res.status(403).json(validationResult);
        }
        const data = validationResult.filteredData;

        try {
            const whereData = {};
            if (data.category_id) {
                whereData.category_id = data.category_id;
            }
            if (data.price_from) {
                whereData.price = {
                    [Op.gte]: data.price_from,
                };
            }
            if (data.price_to) {
                whereData.price = {
                    [Op.lte]: data.price_to,
                };
            }
            if (data.term) {
                whereData[Op.or] = [
                    {
                        title: {
                            [Op.iLike]: `%${data.term}%`
                        }
                    },
                    {
                        description: {
                            [Op.iLike]: `%${data.term}%`
                        }
                    }
                ];
            }

            const {rows, count} = await Post.findAndCountAll({
                where: whereData,
                attributes: [
                    'id',
                    'title',
                    // 'description',
                    'price',
                    'region',
                    'city',
                    'images',
                    'created_at',
                ],
                required: true,
                include: [
                    {
                        model: User,
                        as: 'user',
                        attributes: ['id', 'name'],
                    }, {
                        model: Category,
                        as: 'category',
                        attributes: ['id', 'name'],
                    },
                    {
                        model: Tag,
                        as: 'has_tags',
                        required: false,
                        // where: { id: user.dataValues.id },
                        attributes: [ 'id', 'name', 'count' ],
                        through: {
                            model: PostTag,
                            as: 'post_tags',
                            // attributes: [ 'created_at' ],
                        }
                    }
                ],
                order: [
                    ['created_at', 'DESC'],
                ],
                limit: data.per,
                offset: (data.per * (data.page - 1)),
                distinct: true,
            });

            let total = Math.ceil(count / data.per);
            let prev = data.page - 1;
            if (prev <= 0 || (data.page * data.per <= count && data.page === 1)) {
                prev = '';
            }
            let next = rows.length === data.per ? (data.page + 1) : '';
            if (next > total) {
                next = '';
            }

            const prevPage = `${process.env.APP_HOST}:${process.env.APP_PORT}/api/posts?per=${data.per}&page=${prev}`;
            const nextPage = `${process.env.APP_HOST}:${process.env.APP_PORT}/api/posts?per=${data.per}&page=${next}`;

            return res.status(200).json({
                per: data.per,
                page: data.page,
                count: count,
                total: total,
                prev: prevPage,
                next: nextPage,
                data: rows,
            });
        } catch (err) {
            console.log(err.message);
            return res.status(409).json({
                error: "Something went wrong!",
            });
        }
    },
    create: async (req, res) => {
        if (!req.files || req.files.length === 0) {
            return res.status(403).json({
                error: "Image(s) required!"
            });
        }

        const validationResult = validate.create(req.body);
        if (validationResult.error) {
            return res.status(403).json(validationResult);
        }
        const postData = validationResult.filteredData;

        const user = await User.findOne({
            where: { email: req.user.email }
        });
        if (!user) {
            return res.status(409).json({
                error: "Something went wrong!" // 500
            });
        }

        const imageNames = [];
        for (let image of req.files) {
            imageNames.push(image.filename);
        }

        let categoryId = postData.category_id;
        if (!categoryId) {
            const category = await Category.findOne({
                attributes: ['id'],
                order: Sequelize.literal('random()'),
            });
            if (category) {
                categoryId = category.dataValues.id;
            }
        }

        try {
            const post = await Post.create({
                category_id: categoryId,
                user_id: user.dataValues.id,
                title: postData.title,
                description: postData.description,
                price: postData.price,
                region: postData.region,
                city: postData.city,
                images: imageNames,
            });

            const postTags = [];
            for (let tag of postData.tags) {
                let postTag = await Tag.findOne({ where: {name: tag.name}});
                if (postTag) {
                    await postTag.update({
                        count: postTag.dataValues.count + 1,
                    });
                } else {
                    postTag = await Tag.create({
                        name: tag.name,
                        count: 1,
                        created_at: new Date(),
                        updated_at: new Date(),
                    });
                }
                postTags.push({
                    post_id: post.dataValues.id,
                    tag_id: postTag.dataValues.id,
                    created_at: new Date(),
                    updated_at: new Date(),
                });
            }
            await PostTag.bulkCreate(postTags);

            return res.status(201).json({
                message: "Post created successfully."
            });
        } catch (err) {
            console.log(err.message);
            return res.status(409).json({
                error: "Something went wrong!", // 500
            });
        }
    },
    update: async (req, res) => {
        const postId = req.params.postId;
        const validationResult = validate.update({
            postId: postId,
            ...req.body,
        });
        if (validationResult.error) {
            return res.status(403).json(validationResult);
        }
        const postData = validationResult.filteredData;

        const user = await User.findOne({
            where: { email: req.user.email }
        });
        if (!user) {
            return res.status(409).json({
                error: "Something went wrong!" // 500
            });
        }

        let categoryId = postData.category_id;
        if (!categoryId) {
            const category = await Category.findOne({
                attributes: ['id'],
                order: Sequelize.literal('random()'),
            });
            if (category) {
                categoryId = category.dataValues.id;
            }
        }

        try {
            const foundPost = await Post.findOne({
                where: {
                    id: postData.postId,
                    user_id: req.user.id, // user.dataValues.id
                },
                include: [
                    {
                        model: Tag,
                        as: 'has_tags',
                        required: false,
                        // where: { id: user.dataValues.id },
                        attributes: [ 'id', 'name', 'count' ],
                        through: {
                            model: PostTag,
                            as: 'post_tags',
                            // attributes: [ 'created_at' ],
                        }
                    }
                ],
            });
            if (!foundPost) {
                return res.status(401).json({
                    error: "Post not found!"
                });
            }

            let images = foundPost.dataValues.images;
            const newImages = [];
            if (req.files && req.files.length > 0) {
                for (let image of req.files) {
                    newImages.push(image.filename);
                }
                images = images.concat(newImages);
            }

            // loop through all the Post tags
            foundPost.has_tags.map(async postTag => {
                await postTag.post_tags.destroy();
                if (postTag.dataValues.count > 1) {
                    await postTag.update({
                        count: postTag.dataValues.count - 1,
                        updated_at: new Date(),
                    });
                } else {
                    await postTag.destroy();
                }
            });

            const postTags = [];
            for (let tag of postData.tags) {
                let postTag = await Tag.findOne({ where: {name: tag.name}});
                if (postTag) {
                    await postTag.update({
                        count: postTag.dataValues.count + 1,
                    });
                } else {
                    postTag = await Tag.create({
                        name: tag.name,
                        count: 1,
                        created_at: new Date(),
                        updated_at: new Date(),
                    });
                }
                postTags.push({
                    post_id: postData.postId,
                    tag_id: postTag.dataValues.id,
                    created_at: new Date(),
                    updated_at: new Date(),
                });
            }
            await PostTag.bulkCreate(postTags);

            await foundPost.update({
                category_id: categoryId,
                user_id: user.dataValues.id,
                title: postData.title,
                description: postData.description,
                price: postData.price,
                region: postData.region,
                city: postData.city,
                images: images,
                // updated_at: new Date(),
            });

            return res.status(201).json({
                data: foundPost,
                message: "Post updated successfully."
            });
        } catch (err) {
            console.log(err.message);
            return res.status(409).json({
                error: "Something went wrong!", // 500
            });
        }
    },
    delete: async (req, res) => {
        const validationResult = validate.delete(req.params);
        if (validationResult.error) {
            return res.status(403).json(validationResult);
        }
        const postData = validationResult.filteredData;

        const post = await Post.findOne({
            where: { id: postData.postId }
        });
        if (!post) {
            return res.status(409).json({
                error: "Post not found!" // 500
            });
        }

        await post.destroy();

        return res.status(201).json({
            message: "Post deleted successfully."
        });
    },
};
