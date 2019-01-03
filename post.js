const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  title: String,
  description: String,
  date: String
});

const postModel = mongoose.model("Post", PostSchema);

module.exports = postModel;
