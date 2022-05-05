'use strict';

const validator = require('validator');
const isEmpty = require('lodash.isempty');
const helper = require('./../utilities/helper');

module.exports = {
    register: (data) => {
        const filteredData = {};

        // step 1
        if (isEmpty(data)) {
            return {
                error: "Please fill all the fields!",
            };
        }

        // step 2
        const requiredProps = [
            'name',
            'email',
            'password',
        ];
        for (let prop of requiredProps) {
            if (!(prop in data)) {
                return {
                    error: `Please fill ${prop} field!`,
                };
            }
        }

        // step 3
        if (validator.isEmail(data.email)) {
            filteredData.email = data.email;
        } else {
            return {
                error: "Please enter a valid email!",
            };
        }

        if (validator.isLength(data.name, {min: 1, max: 100})) {
            filteredData.name = data.name;
        } else {
            return {
                error: "Name must have max 100 chars!"
            };
        }

        if (validator.isLength(data.password, {min: 6, max: 30})) {
            filteredData.password = data.password;
        } else {
            return {
                error: "Password must have 6-30 chars!"
            };
        }

        return {
            filteredData: filteredData
        };
    },
    login: (data) => {
        const filteredData = {};

        // step 1
        if (isEmpty(data)) {
            return {
                error: "Please fill all the fields!",
            };
        }

        // step 2
        const requiredProps = [
            'email',
            'password',
        ];
        for (let prop of requiredProps) {
            if (!(prop in data)) {
                return {
                    error: `Please fill ${prop} field!`,
                };
            }
        }

        // step 3
        if (!isEmpty(data.email)) {
            filteredData.email = data.email;
        } else {
            return {
                error: "Please enter a valid email!",
            };
        }
        if (!isEmpty(data.password)) {
            filteredData.password = data.password;
        } else {
            return {
                error: "Please enter a valid password!",
            };
        }

        return {
            filteredData: filteredData
        };
    },
};
