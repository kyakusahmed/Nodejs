const express = require("express");
const router = express.Router();

const User = require("../models/userAuthentication");

router.post("/signup", (req, res) => {
  const post = new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: req.body.password,
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
