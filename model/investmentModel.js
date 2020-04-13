const mongoose = require("mongoose");

const investmentSchema = new mongoose.Schema({

    user: {
        type: mongoose.Schema.ObjectId,
        ref: "User"
    },

    username: { type: String },

    investor: {
        type: String
    },


    amount: {
        type: Number,
        required: [true, "Must be Investing Amount"]
    },

    date: {
        type: Date,
        required: [true, "Investment must have a Date."]
    },

    image: {
        type: String,
    },
    // imageId: String,

    createdAt: {
        type: Date,
        default: Date.now
    },


});

investmentSchema.pre(/^find/, function (next) {
    this.populate({
        path: "user",

    });
    next();
});

module.exports = Investment = mongoose.model("Investment", investmentSchema);

// $match: {
//     project: `${project}`
// },