const express = require("express");
const router = express.Router();

const Post = require("../models/post");

router.get("/mine", (req, res) => {
  res.send("my name is ahmed");
});

router.post("/item", (req, res) => {
  const post = new Post({
    Images: req.body.images,
    Title: req.body.title,
    Description: req.body.description,
    AnyFault: req.body.description,
    YourLocation: req.body.YourLocation,
    Contact: req.body.contact,
    ExpectedItemInReturn: req.body.ExpectedItemInReturn,
  });
  post
    .save()
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.json({ msg: err });
    });
  console.log(req.body);
});

module.exports = router;
