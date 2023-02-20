const mongoose = require("mongoose");

const postsSchema = mongoose.Schema({
  title: String,
  body: String,
  device: String,
  no_of_comments: Number,
  userID:String
});

const PostsModel = mongoose.model("posts", postsSchema);

module.exports = {
  PostsModel,
};
