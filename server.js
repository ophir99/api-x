const express = require("express");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");
const post = require("./post");
const user = require("./user");
app.use(cors());
app.use(express.json());
mongoose
  .connect("mongodb://127.0.0.1:27017/mydbNew")
  .catch(err => console.log(err));
app.get("/posts", async (req, res) => {
  console.log("hitting..");
  await post
    .find()
    .then(result => {
      res.send({ posts: result });
    })
    .catch(err => {
      res.send({ posts: [] });
    });
});

app.post("/posts", (req, res) => {
  const post_ = new post({
    title: req.body.title,
    description: req.body.description,
    date: new Date()
  });

  post_
    .save()
    .then(result => {
      res.send({ msg: "Successfull Created" });
    })
    .catch(err => {
      res.send({ msg: "Failed" });
    });
});
app.put("/posts/:id", (req, res) => {
  post
    .update(
      { _id: req.params.id },
      { $set: { title: req.body.title, description: req.body.description } }
    )
    .then(result => {
      res.send({ msg: "Successfull Created" });
    })
    .catch(err => {
      res.send({ msg: "Failed" });
    });
});
app.delete("/posts/:id", (req, res) => {
  post
    .deleteOne({ _id: req.params.id })
    .then(result => {
      res.send({ msg: "Successfull Created" });
    })
    .catch(err => {
      res.send({ msg: "Failed" });
    });
});

app.post("/login", (req, res) => {
  user
    .find({ name: req.body.name, password: req.body.password })
    .then(data => {
      if (data.length > 0) {
        res.send({ msg: data });
      } else {
        res.send({ msg: "User not found" });
      }
    })
    .catch(err => {
      res.send({ msg: err });
    });
});
app.post("/createUser", (req, res) => {
  const user_ = new user({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password
  });

  user_
    .save()
    .then(result => {
      res.send({ msg: result });
    })
    .catch(err => {
      res.send({ error: err });
    });
});
app.listen(8900, () => {
  console.log("Started....");
});
