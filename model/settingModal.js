const mongoose = require("mongoose");

const settingSchema = new mongoose.Schema({

    default_grocery: {
        type: mongoose.Schema.ObjectId,
        ref: "Grocery"
    },

    createdAt: {
        type: Date,
        default: Date.now
    },

});


settingSchema.pre(/^find/, function (next) {
    this.populate({
        path: "default_grocery",
        select: "groceryKitName  price"
    });
    next();
});

module.exports = Setting = mongoose.model("Setting", settingSchema);
