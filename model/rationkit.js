const mongoose = require("mongoose");

const rationSchema = new mongoose.Schema({


    rationKit: {
        type: Number,
        required: [true, "There must be a ration Name"],

    },


    desc: {
        type: String,
    },

    date: {
        type: Date,
        required: [true, "ration must have a end Date."]
    },

    createdAt: {
        type: Date,
        default: Date.now
    },

});


module.exports = ration = mongoose.model("ration", rationSchema);
