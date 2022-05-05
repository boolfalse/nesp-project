'use strict';

const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        jwt.verify(token, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRES_IN
        }, (err, decoded) => {
            if (err) {
                return res.status(401).json({
                    error: "Failed to authenticate!"
                });
            }

            req.user = decoded;

            return next();
        });
    } catch (err) {
        console.log(err.message);
        return res.status(403).json({
            error: "Please login to continue!"
        });
    }
};
