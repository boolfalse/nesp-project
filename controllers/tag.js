
const validate = require('./../validations/tag');
const { Op } = require('sequelize');

const {
    Tag,
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
            if (data.term) {
                whereData.name = {
                    [Op.iLike]: `%${data.term}%`
                };
            }

            const {rows, count} = await Tag.findAndCountAll({
                where: whereData,
                attributes: [
                    'id',
                    'name',
                    'count',
                ],
                required: true,
                order: [
                    ['count', 'DESC'],
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

            const prevPage = `${process.env.APP_HOST}:${process.env.APP_PORT}/api/tags?per=${data.per}&page=${prev}`;
            const nextPage = `${process.env.APP_HOST}:${process.env.APP_PORT}/api/tags?per=${data.per}&page=${next}`;

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
        const validationResult = validate.create(req.body);
        if (validationResult.error) {
            return res.status(403).json(validationResult);
        }
        const tagData = req.body; // validationResult.filteredData;

        await Tag.create({
            name: tagData.name,
            // count: 0,
        });

        return res.status(201).json({
            message: "Tag created successfully."
        });
    },
    update: async (req, res) => {
        const tagId = req.params.tagId;
        const validationResult = validate.update({
            tagId: tagId,
            ...req.body,
        });
        if (validationResult.error) {
            return res.status(403).json(validationResult);
        }
        const tagData = validationResult.filteredData;

        const tag = await Tag.findOne({
            where: { id: tagData.tagId }
        });

        if (tag) {
            await tag.update({
                name: tagData.name,
            });

            return res.status(201).json({
                message: "Tag updated successfully."
            });
        } else {
            return res.status(409).json({
                error: "Something went wrong!" // 500
            });
        }
    },
    delete: async (req, res) => {
        const validationResult = validate.delete(req.params);
        if (validationResult.error) {
            return res.status(403).json(validationResult);
        }
        const tagData = validationResult.filteredData;

        const tag = await Tag.findOne({
            where: { id: tagData.tagId }
        });

        if (tag) {
            return res.status(409).json({
                error: "Something went wrong!" // 500
            });
        }

        await tag.destroy();

        return res.status(201).json({
            message: "Tag deleted successfully."
        });
    },
};
