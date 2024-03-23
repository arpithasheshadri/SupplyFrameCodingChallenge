const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    contact: {
      type: String,
      required: true,
    },
    currentPassword: {
      type: String,
      required: true,
    },
    previousPasswords: {
      type: Array,
      required: false,
    },
  },
  {
    versionKey: false,
  }
);

const User = mongoose.model("Users", userSchema);

module.exports = User;
