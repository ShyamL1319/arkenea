const mongoose = require("mongoose");
const expressValidator = require("express-validator");
//name, email, position, and salary
const User = new mongoose.Schema({
    firstName: {
        type: String,
        trim: true,
        default: "",
    },
    lastName: {
        type: String,
        trim: true,
        default: ""
    },
    email: {
        type: String,
        trim: true,
        unique: [true, 'Please provide unique values'],
    },
    phoneNo: {
        type: Number,
        default: "",
    },
    profileImg: {
        type: String,
        trim: true,
        default: "",
    },
});
module.exports = mongoose.model("user", User);