'use strict';

const validator = require('validator');
const isEmpty = require('lodash.isempty');
const appConfigs = require('./../config/app');
const helper = require('./../utilities/helper');

module.exports = {
    list: (data) => {
        const filteredData = {};

        // step 1
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
            'name',
        ];
        for (let prop of requiredProps) {
            if (!(prop in data)) {
                return {
                    error: `${prop} field is required!`
                };
            }
        }

        // step 3
        if (validator.isLength(data.name, {min: 1, max: 200})) {
            filteredData.name = data.name;
        } else {
            return {
                error: "name must have max 200 chars!"
            };
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
        //     'name',
        // ];
        // for (let prop of requiredProps) {
        //     if (!(prop in data)) {
        //         return {
        //             error: "Body not valid!"
        //         };
        //     }
        // }

        // step 3
        if (data.name) {
            if (validator.isLength(data.name, {min: 1, max: 200})) {
                filteredData.name = data.name;
            } else {
                return {
                    error: "name must have max 200 chars!"
                };
            }
        }

        // step 4
        if (data.tagId) {
            if (helper.is_natural(data.tagId)) {
                filteredData.tagId = parseInt(data.tagId);
            } else {
                return {
                    error: "Tag ID is not valid!"
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
        if (data.tagId) {
            if (helper.is_natural(data.tagId)) {
                filteredData.tagId = parseInt(data.tagId);
            } else {
                return {
                    error: "Tag ID is not valid!"
                };
            }
        }

        return {
            filteredData: filteredData
        };
    },
};
