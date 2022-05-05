
module.exports = {
    image_name_length: 20, // 20
    image_max_size: 28, // 5-28 MB
    post: {
        product_price_min: 1, // 1 - 100
        product_price_max: 1000 * 100, // 100000 - 100000000
        search_min_letters: 3, // 3
        image_upload_max_count: 10, // 10-20
    },
    seed: {
        category: {
            count: 20, // 5-20
            posts_count_interval: {
                min: 1,
                max: 5
            },
        },
        post: {
            random_images_count: 10,
            images_max_count: 3, // 3-10
            tag_usages_count: 10, // 5-10
        },
        tag: {
            count: 5, // 5-20
        },
    },
    jwt: {
        secret: process.env.JWT_SECRET || "secret",
        expiresIn: process.env.JWT_EXPIRES_IN || "1d",
    },
};
