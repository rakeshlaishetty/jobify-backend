const bcrypt = require('bcryptjs');
const { HASH_SECRETS } = require("../config/Constants")

const hashPassword = async (password) => {
    const salt = await bcrypt.genSalt(HASH_SECRETS.SALT_ROUNDS);
    return await bcrypt.hash(password, salt);
};

const comparePassword = async (password, hashedPassword) => {
    return await bcrypt.compare(password, hashedPassword);
};

module.exports = {
    hashPassword,
    comparePassword,
};
