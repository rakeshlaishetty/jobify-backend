const User = require("../app/user/schemas/schema");
const { verifyToken } = require("../utils/jwt");
const { sendErrorResponse } = require("../utils/response");

const authenticateUser = async (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    console.log(req.headers.authorization,"req.headers.authorization")
    if (!token) {
        return res.status(401).json({ message: 'Authentication token missing' });
    }
    try {
        const decoded = verifyToken(token);
        if (decoded && decoded.id) {
            req.user = await User.findById(decoded.id).populate("role");
            next();
        } else {
            return sendErrorResponse(res, "Invalid token data", 500);
        }
    } catch (error) {
        return sendErrorResponse(res, (error?.message || "Authentication Failed"), 500);
    }
};

module.exports = authenticateUser