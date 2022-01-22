const mongoose = require("mongoose");
const User = require("./userSchema");

const infoSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  company_name: {
    type: String,
    require: [true, "Company Name is required"],
  },
  photo: {
    type: String,
    require: [true, "Logo is required"],
    default: "",
  },
  address: {
    type: String,
    require: [true, "Address is required"],
  },
  country: {
    type: String,
    require: [true, "Country is required"],
  },
  city: {
    type: String,
    require: [true, "City is required"],
  },
  description: {
    type: String,
    require: [true, "Description is required"],
  },
  userID: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

module.exports = mongoose.model("Info", infoSchema);
