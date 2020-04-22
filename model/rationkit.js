const mongoose = require("mongoose");

const rationSchema = new mongoose.Schema({
  kitType: {
    type: String,
    required: [true, "kit type missing"],
  },
  kitQuantity: {
    type: Number,
    required: [true, "kit quantity missing"],
  },
  state: {
    type: String,
    required: [true, "state missing"],
  },
  city: {
    type: String,
    required: [true, "city missing"],
  },
  area: {
    type: String,
    required: [true, "area missing"],
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
  description: {
    type: String,
  },
  active: {
    type: Boolean,
    default: true,
    select: false,
  },
  date: {
    type: Date,
    // required: [true, "Date missing"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = ration = mongoose.model("ration", rationSchema);
