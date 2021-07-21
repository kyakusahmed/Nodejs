const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/userAuthentication");

router.post("/signup", (req, res) => {
  User.find({ email: req.body.email })
    .exec()
    .then((user) => {
      console.log(user);
      if (user.length >= 1) {
        return res.status(409).json({
          message: "email is already registered",
        });
      } else {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          if (err) {
            return res.status(500).json({ error: err });
          } else {
            const post = new User({
              firstName: req.body.firstName,
              lastName: req.body.lastName,
              email: req.body.email,
              password: hash,
            });
            post
              .save()
              .then((data) => {
                console.log(data);
                res.status(201).json({
                  message: "user created",
                });
              })
              .catch((err) => {
                res.status(500).json({ error: err });
              });
            console.log(req.body);
          }
        });
      }
    });
});

router.post("/login", (req, res) => {
  User.find({ email: req.body.email })
    .exec()
    .then((user) => {
      if (user.length < 1) {
        return res.status(401).json({
          message: "Auth failed",
        });
      }
      bcrypt.compare(req.body.password, user[0].password, (err, result) => {
        if (err) {
          return res.status(401).json({
            message: "Auth failed",
          });
        }
        if (result) {
          const token = jwt.sign(
            {
              email: user[0].email,
              userId: user[0]._id,
            },
            process.env.JWT_KEY,
            { expiresIn: "1h" }
          );
          return res.status(200).json({
            message: "auth is successful",
            token: token,
          });
        }
        res.status(401).json({
          message: "auth has failed",
        });
      });
    })
    .catch((err) => {
      res.json({ error: err });
    });
});

module.exports = router;
