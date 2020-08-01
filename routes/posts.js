const express = require("express");
const router = express.Router();

const Post = require("../models/post");

router.get("/mine", (req, res) => {
  res.send("my name is ahmed");
});

router.post("/", (req, res) => {
  console.log(req.body);
});

module.exports = router;
