const mongoose = require("mongoose");


const customerPaySchema = new mongoose.Schema({


    user: {
        type: mongoose.Schema.ObjectId,
        ref: "User"
    },
    customer: {
        type: String,
        required: [true, "Must be a Customer"]
    },
    project: {
        type: mongoose.Schema.ObjectId,
        ref: "Project",
        required: [true, "There must be a project Name"],

    },

    invoiceNo: {
        type: String,
        required: [true, "Must be Invoice Number"]
    },

    amount: {
        type: Number,
        required: [true, "Must be Investing Amount"]
    },

    currency: {
        type: String,
        required: [true, "Must be Currency Type"]
    },
    convAmt: {
        type: Number,
        //required: [true, "Must be Currency Type"]
    },

    date: {
        type: String,
        required: [true, "CustomerPay must have a Date."]
    },

    createdAt: {
        type: Date,
        default: Date.now
    },

});

customerPaySchema.pre(/^find/, function (next) {
    this.populate({
        path: "project",
        select: " projectName customerName startDate  endDate "
    }).populate({
        path: "user",

    });
    next();
});

module.exports = CustomerPay = mongoose.model("CustomerPay", customerPaySchema);
