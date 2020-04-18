const mongoose = require("mongoose");

const whatsgroup = new mongoose.Schema({


    groupLink: {
        type: String,
        required: [true, "There must be a Link"],

    },

    desc: {
        type: String,
    },


    createdAt: {
        type: Date,
        default: Date.now
    },

});


module.exports = Whatsgroup = mongoose.model("Whatsgroup", whatsgroup);
