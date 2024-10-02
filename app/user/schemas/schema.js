const mongoose = require('mongoose');
const { ROLES } = require('../../../config/Constants');
const { Schema } = mongoose;

const userSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Role',
        required: true,
    },
}, {
    timestamps: true
});

module.exports = mongoose.model('User', userSchema);
