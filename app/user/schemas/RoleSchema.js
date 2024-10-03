const mongoose = require("mongoose");
const { ROLES } = require("../../../config/Constants");


const roleSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        enum: Object.values(ROLES)
    },
});

const Role = mongoose.model("Role", roleSchema);
module.exports = Role;
