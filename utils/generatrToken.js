// this file will create a JWT token for the user
const jwt = require('jsonwebtoken');

const generateToken = (payload) => {
    return jwt.sign({payload}, process.env.JWT_SECRET, {
        expiresIn: '30d'
    });
}

module.exports = generateToken;