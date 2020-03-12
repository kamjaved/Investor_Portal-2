const mongoose = require('mongoose');
const validator = require("validator");

const CustomerSchema = new mongoose.Schema({

    name: {
        type: String,
        required: [true, "There must be a Customer Name"],

    },
    address: {
        type: String,
        required: [true, "There must be a Customer Address"],

    },
    email: {
        type: String,
        required: [true, "Please provide your email"],
        unique: true,
        lowercase: true,
        validate: [validator.isEmail, "Please provide a valid email"]
    },

    phone: {
        type: Number,
        //required: [true, "Customer must have a end Date."]
    },

    createdAt: {
        type: Date,
        default: Date.now
    },

})


module.exports = new mongoose.model('Customer', CustomerSchema)