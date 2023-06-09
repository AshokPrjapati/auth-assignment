const jwt = require('jsonwebtoken');
require("dotenv").config();

exports.generateToken = (payload) => {
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRATION,
    });
    return token;
};