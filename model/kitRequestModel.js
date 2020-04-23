const mongoose = require("mongoose");
const validator = require("validator");


const kitRequestSchema = new mongoose.Schema({

    name: {
        type: String,
    },
    state: {
        type: String,
        required: [true, "state missing"],
    },
    stateName: {
        type: String,
        //required: [true, "state missing"],
    },
    city: {
        type: String,
        required: [true, "city missing"],
    },
    area: {
        type: String,
        required: [true, "area missing"],
    },
    email: {
        type: String,
        required: [true, "Please provide your email"],
        lowercase: true,
        validate: [validator.isEmail, "Please provide a valid email"],
    },
    road: {
        type: String,
    },
    landmark: {
        type: String,
    },
    houseNo: {
        type: String,
    },
    kitQuantity: {
        type: String,
    },
    phone: {
        type: String,
    },
});

module.exports = KitReq = mongoose.model(
    "KitReq",
    kitRequestSchema
);
