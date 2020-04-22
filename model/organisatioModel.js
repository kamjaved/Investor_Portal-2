const mongoose = require("mongoose");

const organisationSchema = new mongoose.Schema({
  orgName: {
    type: String,
    required: [true, "organisation name missing"],
  },
  state: {
    type: String,
  },
  city: {
    type: String,
  },
  address: {
    type: String,
  },
  email: {
    type: String,
  },
  website: {
    type: String,
  },
  phone: {
    type: String,
  },
  logo: {
    type: String,

  },
});

module.exports = Organisation = mongoose.model(
  "Organisation",
  organisationSchema
);
