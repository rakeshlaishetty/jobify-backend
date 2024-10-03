const checkRequiredFields = require("../../../utils/CheckRequiredFields");
const { sendErrorResponse, sendSuccessResponse } = require("../../../utils/response");
const Company = require("./schema");

const addcompany = async (req, res) => {
    try {
        const { name, email, phone, website, address } = req.body;

        const fieldError = checkRequiredFields({ email, phone, name });
        if (fieldError) {
            return sendErrorResponse(res, fieldError, 400);
        }


        const existingCompany = await Company.findOne({ email });
        if (existingCompany) {
            return sendErrorResponse(res, "Company with this email already exists.", 400);
        }

        const newCompany = new Company({
            name,
            email,
            phone,
            website,
            address,
        });

        await newCompany.save();
        sendSuccessResponse(res, "Company added successfully", newCompany);
    } catch (error) {
        sendErrorResponse(res, error.message || "Error adding company", 500);
    }
};

// Delete a company
const deletecompany = async (req, res) => {
    try {
        const { id } = req.body;

        if (!id) {
            return sendErrorResponse(res, "Company ID is required", 400);
        }

        const deletedCompany = await Company.findByIdAndDelete(id);
        if (!deletedCompany) {
            return sendErrorResponse(res, "Company not found", 404);
        }

        sendSuccessResponse(res, "Company deleted successfully", deletedCompany);
    } catch (error) {
        sendErrorResponse(res, error.message || "Error deleting company", 500);
    }
};

// Update a company
const updatecompany = async (req, res) => {
    try {
        const { id, name, email, phone, website, address } = req.body;

        if (!id) {
            return sendErrorResponse(res, "Company ID is required", 400);
        }

        const company = await Company.findById(id);
        if (!company) {
            return sendErrorResponse(res, "Company not found", 404);
        }

        // Check for existing company with the same email
        if (email && email !== company.email) {
            const existingCompany = await Company.findOne({ email });
            if (existingCompany) {
                return sendErrorResponse(res, "Company with this email already exists.", 400);
            }
        }

        // Update company details
        if (name) company.name = name;
        if (email) company.email = email;
        if (phone) company.phone = phone;
        if (website) company.website = website;
        if (address) company.address = address;

        await company.save();
        sendSuccessResponse(res, "Company updated successfully", company);
    } catch (error) {
        sendErrorResponse(res, error.message || "Error updating company", 500);
    }
};

// List companies with advanced filtering, sorting, and pagination
const listcompany = async (req, res) => {
    try {
        const { page = 1, limit = 10, sort = "createdAt", filter = {} } = req.body;

        const filterConditions = {};
        if (filter.name) {
            filterConditions.name = { $regex: filter.name, $options: "i" };
        }
        if (filter.email) {
            filterConditions.email = { $regex: filter.email, $options: "i" };
        }

        const companies = await Company.find(filterConditions)
            .sort({ [sort]: 1 })
            .skip((page - 1) * limit)
            .limit(limit);

        const totalCount = await Company.countDocuments(filterConditions);

        sendSuccessResponse(res, "Companies retrieved successfully", {
            total: totalCount,
            page,
            limit,
            companies,
        });
    } catch (error) {
        sendErrorResponse(res, error.message || "Error retrieving companies", 500);
    }
};

module.exports = { listcompany, addcompany, deletecompany, updatecompany }