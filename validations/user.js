'use strict';

const validator = require('validator');
const isEmpty = require('lodash.isempty');
const helper = require('./../utilities/helper');

module.exports = {
    changePassword: (data) => {
        const filteredData = {};

        // step 1
        if (isEmpty(data)) {
            return {
                error: "Body not valid!"
            };
        }

        // step 2
        const requiredProps = [
            'old_password',
            'new_password',
        ];
        for (let prop of requiredProps) {
            if (!(prop in data)) {
                return {
                    error: "Body not valid!"
                };
            }
        }

        // step 3
        if (validator.isLength(data.old_password, {min: 6, max: 30})) {
            filteredData.old_password = data.old_password;
        } else {
            return {
                error: "Old Password must have 6-30 chars!"
            };
        }
        if (validator.isLength(data.new_password, {min: 6, max: 30})) {
            filteredData.new_password = data.new_password;
        } else {
            return {
                error: "New Password must have 6-30 chars!"
            };
        }
        if (data.new_password === data.old_password) {
            return {
                error: "Passwords are matching!"
            };
        }

        return {
            filteredData: filteredData
        };
    },
    changeDetails: (data) => {
        const filteredData = {};

        // step 1
        if (isEmpty(data)) {
            return {
                error: "Body not valid!"
            };
        }

        // step 2
        if (data.name) {
            if (validator.isLength(data.name, {min: 1, max: 100})) {
                filteredData.name = data.name;
            } else {
                return {
                    error: "Name must have max 100 chars!"
                };
            }
        }

        return {
            filteredData: filteredData
        };
    },
};
