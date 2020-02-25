const mongoose = require("mongoose");
const shortid = require('shortid');

const projectSchema = new mongoose.Schema({


    projectName: {
        type: String,
        required: [true, "There must be a Project Name"],

    },
    customerName: {
        type: String,
        required: [true, "There must be a Customer Name"],

    },

    startDate: {
        type: String,
        required: [true, "Project must have a start Date."]
    },

    endDate: {
        type: String,
        required: [true, "Project must have a end Date."]
    },

    createdAt: {
        type: Date,
        default: Date.now
    },

});

module.exports = Project = mongoose.model("Project", projectSchema);
