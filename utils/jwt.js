const jwt = require("jsonwebtoken");
const { SERVER_CREDS } = require("../config/Constants")
const secretKey = SERVER_CREDS.JWT_SECRET

const generateToken = (user) => {
    return jwt.sign({ id: user._id }, secretKey, {
        expiresIn: "10h",
    });
};

const verifyToken = (token) => {
    return jwt.verify(token, secretKey);
};

module.exports = {
    generateToken,
    verifyToken,
};
