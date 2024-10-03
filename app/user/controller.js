const { hashPassword } = require("../../utils/bcrypt");
const User = require("../user/schemas/schema")
const Role = require("../user/schemas/RoleSchema");
const { ROLES } = require("../../config/Constants");
const checkRequiredFields = require("../../utils/CheckRequiredFields");
const { sendErrorResponse, sendSuccessResponse } = require("../../utils/response");

const AddUserAdmin = async (req, res) => {
    try {
        const { email, password, name } = req.body;
        const fieldError = checkRequiredFields({ email, password, name });
        if (fieldError) {
            return sendErrorResponse(res, fieldError, 400);
        }
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return sendErrorResponse(res, "User with this email already exists.", 400);
        }


        const hashed_password = await hashPassword(password)
        const role = await Role.findOne({ name: ROLES.ADMIN });
        if (!role) {
            return sendErrorResponse(res, "ADMIN role not found.", 400);
        }
        const newUser = new User({
            email,
            password: hashed_password,
            name,
            role: role._id
        });
        await newUser.save();
        sendSuccessResponse(res, "user Created Successfully", newUser, 201);

    } catch (error) {
        return sendErrorResponse(res, (error.message || "Something Went Wrong"), 400);
    }
}


const signup = async (req, res) => {

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
        email,
        password: hashedPassword,
        name,
    });

    return await newUser.save();
};

module.exports = { AddUserAdmin }