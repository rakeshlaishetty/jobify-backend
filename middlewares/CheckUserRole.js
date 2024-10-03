const { sendErrorResponse } = require('../utils/response');
const { ROLES } = require('./../config/Constants');

const isSuperAdmin = (req, res, next) => {
    try {
        const user = req.user;
        if (user.role.name === ROLES.SUPERADMIN) {
            next()
        } else {
            sendErrorResponse(res, "You are not authorized to access this resource", 403);
        }
    } catch (error) {
        sendErrorResponse(res, (error?.message || "Super admin verifictaion Failed"), 500);
    }
}
const isAdmin = (req, res, next) => {
    try {
        const user = req.user;
        if (user.role.name === ROLES.ADMIN) {
            next()
        } else {
            sendErrorResponse(res, "You are not authorized to access this resource", 403);
        }
    } catch (error) {
        sendErrorResponse(res, (error?.message || "Super admin verifictaion Failed"), 500);
    }
}
module.exports = { isSuperAdmin,isAdmin }