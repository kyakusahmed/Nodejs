const express = require("express");
const mongoose = require("mongoose");
const app = express();
require("dotenv/config");

const postRoute = require("./routes/posts");

app.use("/posts", postRoute);

app.get("/", (req, res) => {
  res.send("Hani pie not right now");
});

mongoose.connect(
  process.env.DB_CONNECTION,
  { useNewUrlParser: true },
  (err) => {
    if (!err) {
      console.log("connected to mongoDB.");
    } else console.log("error in DB connection: --- " + err);
  }
);

//how to listen to the server
app.listen(3000);
