const mongoose = require('mongoose');
const { ROLES } = require('../../config/Constants');
const { Schema } = mongoose;

const userSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
        type: String,
        enum: Object.values(ROLES),
        required: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('User', userSchema);
