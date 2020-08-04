const express = require("express");
const router = express.Router();

const Post = require("../models/post");

router.post("/", (req, res) => {
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
      res.json({ error: err });
    });
  console.log(req.body);
});

router.get("/", async (req, res) => {
  try {
    const posts = await Post.find();
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json({
      error: err,
    });
  }
});

router.get("/:itemId", async (req, res, next) => {
  try {
    const item = await Post.findOne({ _id: req.params.itemId });
    if (item) {
      return res.status(200).json({ item });
    } else {
      return res.status(404).json({
        message: "user does not exist",
      });
    }
  } catch (err) {
    res.status(500).json({
      error: err,
    });
  }
});

router.delete("/:itemId", async (req, res, next) => {
  try {
    const item = await Post.findOne({ _id: req.params.itemId });
    if (item) {
      item.remove({ _id: req.params.itemId });
      return res.status(200).json({ message: "item is deleted" });
    } else {
      return res.status(404).json({
        message: "user does not exist",
      });
    }
  } catch (err) {
    res.status(500).json({
      error: err,
    });
  }
});

router.patch("/:itemId", async (req, res, next) => {
  try {
    const updatePost = await Post.updateOne(
      { _id: req.params.itemId },
      {
        $set: {
          Title: req.body.Title,
          Description: req.body.Description,
          AnyFault: req.body.AnyFault,
          YourLocation: req.body.YourLocation,
          Contact: req.body.Contact,
          ExpectedItemInReturn: req.body.ExpectedItemInReturn,
        },
      }
    );
    if (updatePost) {
      return res.status(200).json({ message: "item is updated" });
    }
  } catch (err) {
    res.status(500).json({
      error: err,
    });
  }
});

module.exports = router;
