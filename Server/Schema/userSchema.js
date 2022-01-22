const mongoose = require("mongoose");
const { isEmail } = require("validator");
const Info = require("./infoSchema");

const userSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  email: {
    type: String,
    trim: true,
    require: [true, "Email is required"],
    validate: [isEmail, "Email is not valid"],
  },
  password: {
    type: String,
    trim: true,
    required: [true, "Password is required"],
    minlength: [8, "Minimum 8 characters"],
  },
  info: [{ type: mongoose.Schema.Types.ObjectId, ref: "Info" }],
  created_at: { type: Date, required: true, default: Date.now },
});

module.exports = mongoose.model("User", userSchema);
