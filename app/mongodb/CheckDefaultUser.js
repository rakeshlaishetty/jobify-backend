const { ROLES, DEFAULTUSERS } = require("../../config/Constants");
const User = require("../../app/user/schema");
const { hashPassword } = require("../../utils/bcrypt");

const checkAndCreateUsers = async () => {
    const usersToCheck = [
        { email: DEFAULTUSERS.SUPERADMIN, role: ROLES.SUPERADMIN },
        { email: DEFAULTUSERS.ADMIN, role: ROLES.ADMIN }
    ];

    for (const userData of usersToCheck) {
        // Check if user exists
        let user = await User.findOne({ email: userData.email });
        if (!user) {
            console.log(`${userData.email} not found. Creating user...`);

            // Hash password using the utility function
            const encryptedPassword = await hashPassword(userData.email);

            // Create user
            user = new User({
                name: userData.email.split('@')[0],  // Using the email prefix as name
                email: userData.email,
                password: encryptedPassword,
                role: userData.role
            });

            await user.save();
            console.log(`${userData.email} created successfully.`);
        } else {
            console.log(`${userData.email} already exists.`);
        }
    }
};

module.exports = checkAndCreateUsers;
