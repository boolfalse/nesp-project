
const bcrypt = require('bcrypt');
const appConfigs = require('./../config/app');
const jwt = require('jsonwebtoken');

const validate = require('./../validations/auth');
const {
    User,
} = require('./../models');



module.exports = {
    register: async (req, res) => {
        const validationResult = validate.register(req.body);
        if (validationResult.error) {
            return res.status(403).json(validationResult);
        }
        const userData = validationResult.filteredData;

        const foundUser = await User.findOne({
            where: { email: userData.email }
        });
        if (foundUser) {
            return res.status(409).json({
                error: "Email already exists!"
            });
        } else {
            try {
                const hashedPassword = await bcrypt.hash(userData.password, 10);
                await User.create({
                    ...userData,
                    password: hashedPassword,
                });
            } catch (err) {
                return res.status(403).json({
                    error: "Something went wrong!" // 500
                });
            }
        }

        return res.status(201).json({
            message: "User signed up successfully."
        });
    },
    login: async (req, res) => {
        const validationResult = validate.login(req.body);
        if (validationResult.error) {
            return res.status(403).json(validationResult);
        }
        const user = validationResult.filteredData;

        try {
            const foundUser = await User.findOne({
                where: { email: user.email }
            });
            if (!foundUser) {
                return res.status(403).json({
                    error: "Incorrect credentials!"
                });
            }

            const isPasswordValid = await bcrypt.compare(user.password, foundUser.password);
            if (!isPasswordValid) {
                return res.status(403).json({
                    error: "Incorrect credentials!"
                });
            }

            const token = jwt.sign({
                id: foundUser.id,
                email: foundUser.email,
            }, appConfigs.jwt.secret, {
                expiresIn: appConfigs.jwt.expiresIn
            }, (err, token) => {
                if (err) {
                    return res.status(403).json({
                        error: "Something wrong with JWT token!"
                    });
                }

                return res.status(200).json({
                    message: "User logged in successfully.",
                    data: {
                        token: token,
                        user: {
                            id: foundUser.id,
                            email: foundUser.email,
                            name: foundUser.name,
                        }
                    }
                });
            });
        } catch (err) {
            console.log(err.message);
            return res.status(403).json({
                error: "Something went wrong!" // 500
            });
        }
    },
};
