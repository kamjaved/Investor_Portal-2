const mongoose = require("mongoose");

const rationSchema = new mongoose.Schema({


    rationKit: {
        type: Number,
        required: [true, "There must be a ration Name"],

    },

    desc: {
        type: String,
    },

    location: {
        type: String,

    },

    date: {
        type: Date,
        required: [true, "ration must have a end Date."]
    },

    grocerykit: {
        type: mongoose.Schema.ObjectId,
        ref: "Grocery"
    },

    createdAt: {
        type: Date,
        default: Date.now
    },

});


rationSchema.pre(/^find/, function (next) {
    this.populate({
        path: "grocerykit",
        select: "groceryKitName  price"
    });
    next();
});

module.exports = ration = mongoose.model("ration", rationSchema);
