
const bcrypt = require('bcrypt');
const validate = require('./../validations/user');
const helper = require('./../utilities/helper');
const appConfigs = require('./../config/app');

const path = require('path');

const {
    User,
    Sequelize
} = require('./../models');



module.exports = {
    details: async (req, res) => {
        // TODO: develop and optimize this query
        const foundUsers = await User.findAll({
            where: { email: req.user.email },
            attributes: [
                'User.id',
                'User.name',
                'User.email',
            ],
            raw: true,
        });

        if (foundUsers.length > 0) {
            const foundUser = foundUsers[0];
            return res.status(200).json({
                email: req.user.email,
                name: foundUser.name,
            });
        } else {
            
            return res.status(409).json({
                error: "Something went wrong!" // 500
            });
        }
    },
    changePassword: async (req, res) => {
        const validationResult = validate.changePassword(req.body);
        if (validationResult.error) {
            return res.status(403).json(validationResult);
        }
        const data = validationResult.filteredData;

        const foundUser = await User.findOne({
            where: { email: req.user.email },
            attributes: ['id', 'password'],
        });
        if (foundUser) {
            const match = await bcrypt.compare(data.old_password, foundUser.dataValues.password);

            if(match) {
                const hashedPassword = await bcrypt.hash(data.new_password, 10);
                await foundUser.update({
                    password: hashedPassword,
                    updated_at: new Date(),
                });

                return res.status(200).json({
                    message: "Password successfully changed."
                });
            } else {
                return res.status(403).json({
                    error: "Current password is incorrect!"
                });
            }
        } else {
            
            return res.status(409).json({
                error: "Something went wrong!" // 500
            });
        }
    },
    changeDetails: async (req, res) => {
        const validationResult = validate.changeDetails(req.body);
        if (validationResult.error) {
            return res.status(403).json(validationResult);
        }
        const data = validationResult.filteredData;

        const foundUser = await User.findOne({
            where: { email: req.user.email }
        });
        if (!foundUser) {
            return res.status(409).json({
                error: "Something went wrong!" // 500
            });
        }

        if (data) {
            await foundUser.update({
                ...data,
                updated_at: new Date(),
            });

            return res.status(201).json({
                message: "Details successfully updated.",
            });
        } else {
            return res.status(201).json({
                message: "Nothing was changed!",
            });
        }
    },
};
