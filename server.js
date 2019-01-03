const express = require("express");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");
const post = require("./post");
app.use(cors());
app.use(express.json());
mongoose
  .connect("mongodb://127.0.0.1:27017/mydb")
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
app.listen(8900, () => {
  console.log("Started....");
});
