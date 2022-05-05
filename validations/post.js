'use strict';

const validator = require('validator');
const isEmpty = require('lodash.isempty');
const appConfigs = require('./../config/app');
const helper = require('./../utilities/helper');

module.exports = {
    list: (data) => {
        const filteredData = {};

        // step 1
        if (data.category_id) {
            if (helper.is_natural(data.category_id)) {
                filteredData.category_id = parseInt(data.category_id);
            }
        }
        if (data.price_from) {
            if (helper.is_natural(data.price_from)) {
                filteredData.price_from = parseInt(data.price_from);
            } else {
                return {
                    error: "price_from is not valid!"
                };
            }
        }
        if (data.price_to) {
            if (helper.is_natural(data.price_to)) {
                filteredData.price_to = parseInt(data.price_to);
            } else {
                return {
                    error: "price_to is not valid!"
                };
            }
        }
        if (data.term) {
            if (validator.isLength(data.term, {min: 3, max: 100})) {
                filteredData.term = data.term;
            } else {
                return {
                    error: "Term must have 3-100 chars!"
                };
            }
        }

        // part 2
        let page = 1;
        if (data.page) {
            if (helper.is_natural(data.page)) {
                page = Number(data.page) > 0 ? Number(data.page) : 1;
            }
        }
        filteredData.page = page;

        let per = 10;
        if (data.per) {
            if (helper.is_natural(data.per)) {
                per = Number(data.per) > 0 ? Number(data.per) : 10;
            }
        }
        filteredData.per = per > 100 ? 10 : per;

        return {
            filteredData: filteredData
        };
    },
    create: (data) => {
        const filteredData = {};

        // step 1
        if (isEmpty(data)) {
            return {
                error: "Body not valid!"
            };
        }

        // step 2
        const requiredProps = [
            // 'category_id',
            'title',
            'description',
            'price',
            'region',
            'city',
            // 'tags',
        ];
        for (let prop of requiredProps) {
            if (!(prop in data)) {
                return {
                    error: `${prop} field is required!`
                };
            }
        }

        // step 3
        if (validator.isLength(data.title, {min: 1, max: 200})) {
            filteredData.title = data.title;
        } else {
            return {
                error: "Title must have max 200 chars!"
            };
        }
        if (validator.isLength(data.description, {min: 1, max: 2000})) {
            filteredData.description = data.description;
        } else {
            return {
                error: "Description must have max 2000 chars!"
            };
        }
        if (helper.is_natural(data.price)) {
            let price = parseInt(data.price);
            if (price < appConfigs.post.product_price_min ||
                price > appConfigs.post.product_price_max)
            {
                return {
                    error: "Price is not valid!"
                };
            }
            filteredData.price = data.price;
        } else {
            return {
                error: "Price is not valid!"
            };
        }
        if (validator.isLength(data.region, {min: 1, max: 200})) {
            filteredData.region = data.region;
        } else {
            return {
                error: "Region must have max 200 chars!"
            };
        }
        if (validator.isLength(data.city, {min: 1, max: 200})) {
            filteredData.city = data.city;
        } else {
            return {
                error: "City must have max 200 chars!"
            };
        }
        if (data.category_id) {
            if (helper.is_natural(data.category_id)) {
                filteredData.category_id = parseInt(data.category_id);
            } else {
                return {
                    error: "category_id is not valid!"
                };
            }
        }
        if (data.tags) {
            if (Array.isArray(data.tags)) {
                const tags = [];
                for (let tag of data.tags) {
                    if (!validator.isLength(tag, {min: 1, max: 50})) {
                        return {
                            error: "tags must have 1-50 chars!"
                        };
                    }
                    tags.push({
                        name: tag,
                        // created_at: new Date(),
                        // updated_at: new Date(),
                    });
                }
                filteredData.tags = tags;
            } else {
                return {
                    error: "tags is not an array!"
                };
            }
        }

        return {
            filteredData: filteredData
        };
    },
    update: (data) => {
        const filteredData = {};

        // step 1
        if (isEmpty(data)) {
            return {
                error: "Body not valid!"
            };
        }

        // step 2
        // const requiredProps = [
        //     // 'category_id',
        //     'title',
        //     'description',
        //     'price',
        //     'region',
        //     'city',
        //     // 'tags',
        // ];
        // for (let prop of requiredProps) {
        //     if (!(prop in data)) {
        //         return {
        //             error: "Body not valid!"
        //         };
        //     }
        // }

        // step 3
        if (data.title) {
            if (validator.isLength(data.title, {min: 1, max: 200})) {
                filteredData.title = data.title;
            } else {
                return {
                    error: "Title must have max 200 chars!"
                };
            }
        }
        if (data.description) {
            if (validator.isLength(data.description, {min: 1, max: 2000})) {
                filteredData.description = data.description;
            } else {
                return {
                    error: "Description must have max 2000 chars!"
                };
            }
        }
        if (data.price) {
            if (helper.is_natural(data.price)) {
                let price = parseInt(data.price);
                if (price < appConfigs.post.product_price_min ||
                    price > appConfigs.post.product_price_max)
                {
                    return {
                        error: "Price is not valid!"
                    };
                }
                filteredData.price = data.price;
            } else {
                return {
                    error: "Price is not valid!"
                };
            }
        }
        if (data.region) {
            if (validator.isLength(data.region, {min: 1, max: 200})) {
                filteredData.region = data.region;
            } else {
                return {
                    error: "Region must have max 200 chars!"
                };
            }
        }
        if (data.city) {
            if (validator.isLength(data.city, {min: 1, max: 200})) {
                filteredData.city = data.city;
            } else {
                return {
                    error: "City must have max 200 chars!"
                };
            }
        }
        if (data.category_id) {
            if (helper.is_natural(data.category_id)) {
                filteredData.category_id = parseInt(data.category_id);
            } else {
                return {
                    error: "category_id is not valid!"
                };
            }
        }
        if (data.tags) {
            if (Array.isArray(data.tags)) {
                const tags = [];
                for (let tag of data.tags) {
                    if (!validator.isLength(tag, {min: 1, max: 50})) {
                        return {
                            error: "tags must have 1-50 chars!"
                        };
                    }
                    tags.push({
                        name: tag,
                        // created_at: new Date(),
                        // updated_at: new Date(),
                    });
                }
                filteredData.tags = tags;
            } else {
                return {
                    error: "tags is not an array!"
                };
            }
        }

        // step 4
        if (data.postId) {
            if (helper.is_natural(data.postId)) {
                filteredData.postId = parseInt(data.postId);
            } else {
                return {
                    error: "Post ID is not valid!"
                };
            }
        }

        return {
            filteredData: filteredData
        };
    },
    delete: (data) => {
        const filteredData = {};

        // step 1
        if (isEmpty(data)) {
            return {
                error: "Body not valid!"
            };
        }

        // step 2
        if (data.postId) {
            if (helper.is_natural(data.postId)) {
                filteredData.postId = parseInt(data.postId);
            } else {
                return {
                    error: "Post ID is not valid!"
                };
            }
        }

        return {
            filteredData: filteredData
        };
    },
};
