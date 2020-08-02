const mongoose = require("mongoose");

const PostSchema = mongoose.Schema({
  Images: {
    type: String,
    required: true,
  },
  Title: {
    type: String,
    required: true,
  },
  Description: {
    type: String,
    required: true,
  },
  AnyFault: {
    type: String,
    required: true,
  },
  YourLocation: {
    type: String,
    required: true,
  },
  Contact: {
    type: Number,
    required: true,
  },
  ExpectedItemInReturn: {
    type: String,
    required: true,
  },
  Date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Posts", PostSchema);

const authSchema = mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  Date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("auth", authSchema);
