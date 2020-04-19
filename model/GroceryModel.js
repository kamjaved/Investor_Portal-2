const mongoose = require("mongoose");

const grocerySchema = new mongoose.Schema({

    groceryKitName: {
        type: String,
        required: [true, "There must be a grocery Name"],
    },

    price: {
        type: Number,
        required: [true, "There must be a price Name"],
    },

    items: [String],

    createdAt: {
        type: Date,
        default: Date.now
    },

});


module.exports = Grocery = mongoose.model("Grocery", grocerySchema);
