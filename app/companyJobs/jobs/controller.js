const Job = require('../jobs/schema');
const checkRequiredFields = require("../../../utils/CheckRequiredFields")
const { sendErrorResponse, sendSuccessResponse } = require('../../../utils/response');

// Add a new job
const addJob = async (req, res) => {
    try {
        const { title, description, companyId, requirements, salary, location } = req.body;

        // Check required fields
        const fieldError = checkRequiredFields({ title, description, companyId });
        if (fieldError) {
            return sendErrorResponse(res, fieldError, 400);
        }

        const newJob = new Job({
            title,
            description,
            company: companyId,
            requirements,
            salary,
            location,
        });

        await newJob.save();
        sendSuccessResponse(res, "Job added successfully", newJob);
    } catch (error) {
        sendErrorResponse(res, error.message || "Error adding job", 500);
    }
};

// Delete a job by ID
const deleteJob = async (req, res) => {
    try {
        const { id } = req.body; // Get the job ID from the URL params

        const job = await Job.findById(id);
        if (!job) {
            return sendErrorResponse(res, "Job not found", 404);
        }

        await Job.findByIdAndDelete(id);
        sendSuccessResponse(res, "Job deleted successfully", {});
    } catch (error) {
        sendErrorResponse(res, error.message || "Error deleting job", 500);
    }
};

// Update a job by ID
const updateJob = async (req, res) => {
    try {

        const { title, description, requirements, salary, location, id } = req.body;

        const job = await Job.findById(id);
        if (!job) {
            return sendErrorResponse(res, "Job not found", 404);
        }

        // Update job fields if provided
        if (title) job.title = title;
        if (description) job.description = description;
        if (requirements) job.requirements = requirements;
        if (salary) job.salary = salary;
        if (location) job.location = location;

        await job.save();
        sendSuccessResponse(res, "Job updated successfully", job);
    } catch (error) {
        sendErrorResponse(res, error.message || "Error updating job", 500);
    }
};

// List jobs with filtering and pagination
const listJobs = async (req, res) => {
    try {
        const { page = 1, limit = 10, title, companyId } = req.body;

        const query = {};
        if (title) {
            query.title = { $regex: title, $options: "i" };
        }
        if (companyId) {
            query.companyId = companyId;
        }

        const jobs = await Job.find(query)
            .skip((page - 1) * limit)
            .limit(limit);
        const totalJobs = await Job.countDocuments(query);

        sendSuccessResponse(res, "Jobs retrieved successfully", {
            jobs,
            total: totalJobs,
            page,
            totalPages: Math.ceil(totalJobs / limit),
        });
    } catch (error) {
        sendErrorResponse(res, error.message || "Error listing jobs", 500);
    }
};

module.exports = { addJob, deleteJob, updateJob, listJobs };
