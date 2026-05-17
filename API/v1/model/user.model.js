const mongoose = require("mongoose");
const crypto = require("crypto");

const userSchema = new mongoose.Schema({
    fullName: String,
    email: String,
    password: String,
    avatar: String,
    status: {
        type: String,
        default: "active"
    },
    createdAt: Date, 
    updatedAt: Date,
    deleted: {
        type: Boolean,
        default: false
    }
});
const User = mongoose.model('User', userSchema, 'user');
module.exports = User;