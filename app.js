const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const app = express();
require("dotenv/config");

app.use(bodyParser.json());

const postRoute = require("./routes/posts");
const userAuth = require("./routes/auth");

app.use("/posts", postRoute);
app.use("/auth", userAuth);

app.get("/", (req, res) => {
  res.send("Hani pie not right now");
});

mongoose.connect(
  process.env.DB_CONNECTION,
  { useNewUrlParser: true },
  (err) => {
    if (!err) {
      console.log("connected to mongoDB.");
    } else console.log("error in DB connection:   <<<----------->>>   " + err);
  }
);

//how to listen to the server
app.listen(3000);
