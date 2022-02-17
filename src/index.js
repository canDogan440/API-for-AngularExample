const express = require("express");
const mongoose = require("mongoose");
const { MongoClient } = require("mongodb");
const bodyParser = require("body-parser");
const User = require("./models/user.schema");
const jwt = require("jsonwebtoken");
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post("/auth", async (req, res, next) => {
  await User.create({
    username: req.body.username,
    password: req.body.password,
  });
  const user = await User.find();
  res.json(user).status(200);
});

app.post("/login", async (req, res, next) => {
  const user = await User.findOne({
    username: req.body.username,
    password: req.body.password,
  });
  if (user) {
    const token = jwt.sign({ ...user }, "secretToken", { expiresIn: "24h" });

    const decoded = jwt.verify(token, "secretToken");

    console.log(decoded);
    res.status(201).json({ user, token: token, exp: decoded.exp });
  } else {
    res.status(404).json({ message: "User not found" });
  }
});

const dbUri =
  "mongodb+srv://can:cantest@cluster0.xurxi.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

mongoose.connect(
  "mongodb+srv://can:cantest@cluster0.xurxi.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
  () => {
    console.log("data base connetcted");
  }
);

app.listen(3000, () => {
  console.log("server startet");
});


