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


const updateUser = async (req, res) => {
    try {
        const { email, name, password, id } = req.body;

        if (!id) {
            return sendErrorResponse(res, "Please provide user ID", 400);
        }

        let user = await User.findById(id);
        if (!user) {
            return sendErrorResponse(res, "User not found", 404);
        }

        if (email && email !== user.email) {
            const existingUser = await User.findOne({ email });
            if (existingUser) {
                return sendErrorResponse(res, "Email already exists", 400);
            }
            user.email = email;
        }

        if (name) user.name = name;
        if (password) {
            user.password = await hashPassword(password);
        }

        await user.save();
        const updatedUser = user.toObject();
        delete updatedUser.password;

        sendSuccessResponse(res, "User updated successfully", updatedUser);
    } catch (error) {
        sendErrorResponse(res, error?.message || "Error updating user", 500);
    }
};



const deleteUser = async (req, res) => {
    try {
        const { id } = req.body;

        const user = await User.findById(id);
        if (!user) {
            return sendErrorResponse(res, "User not found", 404);
        }

        await user.deleteOne({ _id: id });
        sendSuccessResponse(res, "User deleted successfully");
    } catch (error) {
        sendErrorResponse(res, error?.message || "Error deleting user", 500);
    }
};



const listUsers = async (req, res) => {
    try {

        const { page = 1, limit = 10, sortBy = 'createdAt', order = 'asc' } = req.query;
        const { email, name, role, startDate, endDate } = req.query;

        const pageNumber = parseInt(page);
        const limitNumber = parseInt(limit);

        const filterOptions = {};

        if (email) {
            filterOptions.email = { $regex: email, $options: 'i' };
        }
        if (name) {
            filterOptions.name = { $regex: name, $options: 'i' };
        }
        if (role) {
            filterOptions.role = role;
        }
        if (startDate || endDate) {
            filterOptions.createdAt = {};
            if (startDate) {
                filterOptions.createdAt.$gte = new Date(startDate);
            }
            if (endDate) {
                filterOptions.createdAt.$lte = new Date(endDate);
            }
        }


        const sortOptions = {};
        sortOptions[sortBy] = order === 'asc' ? 1 : -1;

        const users = await User.find(filterOptions)
            .sort(sortOptions)
            .skip((pageNumber - 1) * limitNumber)
            .limit(limitNumber);

        const totalUsers = await User.countDocuments(filterOptions);

        const response = {
            users,
            totalUsers,
            currentPage: pageNumber,
            totalPages: Math.ceil(totalUsers / limitNumber)
        };

        sendSuccessResponse(res, "Users retrieved successfully", response);
    } catch (error) {
        sendErrorResponse(res, error?.message || "Error retrieving users", 500);
    }
};


module.exports = { AddUserAdmin, updateUser, deleteUser, listUsers }