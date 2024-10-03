const { ROLES, DEFAULTUSERS } = require("../../config/Constants");
const User = require("../../app/user/schemas/schema");
const Role = require("../../app/user/schemas/RoleSchema");
const { hashPassword } = require("../../utils/bcrypt");

const checkAndCreateUsers = async () => {
    const rolePromises = Object.keys(ROLES).map(async (roleName) => {
        let role = await Role.findOne({ name: ROLES[roleName] });
        if (!role) {
            console.log(`${ROLES[roleName]} role not found. Creating role...`);
            role = new Role({ name: ROLES[roleName] });
            await role.save();
            console.log(`${ROLES[roleName]} role created successfully.`);
        } else {
            console.log(`${ROLES[roleName]} role already exists.`);
        }
        return role._id;
    });

    const roleIds = await Promise.all(rolePromises);

    const usersToCheck = [
        { email: DEFAULTUSERS.SUPERADMIN, role: roleIds[0] },
        { email: DEFAULTUSERS.ADMIN, role: roleIds[1] }
    ];

    for (const userData of usersToCheck) {
        let user = await User.findOne({ email: userData.email });
        if (!user) {
            console.log(`${userData.email} not found. Creating user...`);

            const encryptedPassword = await hashPassword(userData.email);

            user = new User({
                name: userData.email.split('@')[0],
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
