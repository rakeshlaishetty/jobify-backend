const validator = require('validator');
const checkRequiredFields = (fields) => {
    const missingFields = [];
    const errors = [];
    for (const [key, value] of Object.entries(fields)) {
        if (!value) {
            missingFields.push(key);
        }
    }

    if (fields.email && !validator.isEmail(fields.email)) {
        errors.push("Invalid email format.");
    }

    if (fields.password && !validatePassword(fields.password)) {
        errors.push("Password must be at least 8 characters long and contain at least one number and one special character.");
    }

    if (missingFields.length > 0) {
        errors.push(`Missing required fields: ${missingFields.join(', ')}`);
    }

    return errors.length > 0 ? errors.join(" ") : null;
};

const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/;
    return passwordRegex.test(password);
};

module.exports = checkRequiredFields;
