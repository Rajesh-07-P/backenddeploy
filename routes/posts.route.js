const express = require("express");
const { PostsModel } = require("../models/posts.model");

const postRouter = express.Router();

postRouter.get("/", async (req, res) => {
  const id = req.body.userID;
  const device = req.query.device;
  const device1 = req.query.device1;
  const device2 = req.query.device2;
  try {
    if (device) {
      let posts = await PostsModel.find({ userID: id, device });
            res.send(posts);
    } else if (device1 || device2) {
      let posts = await PostsModel.find({ userID: id, device1,device2 });
            res.send(posts);
    } else {
      let posts = await PostsModel.find({ userID: id });
      res.send(posts);
    }
  } catch (err) {
    console.log(err);
    res.end("something went wrong");
  }
});

postRouter.post("/post", async (req, res) => {
  const payload = req.body;
  try {
    let post = new PostsModel(payload);
    await post.save();
    res.send("posted successfully");
  } catch (err) {
    console.log(err);
    res.send("Something went wrong");
  }
});

postRouter.get("/top", async (req, res) => {
  try {
    let posts = await PostsModel.find();
    let max = 0;
    let reqpost = {};
    for (let i = 0; i < posts.length; i++) {
      if (posts[i].no_of_comments > max) {
        max = posts[0].no_of_comments;
        reqpost = posts[i];
      }
    }
    res.send(reqpost);
  } catch (err) {
    console.log(err);
    res.send("Something went wrong");
  }
});

postRouter.patch("/update/:id", async (req, res) => {
  let payload = req.body;
  let id = req.params.id;
  try {
    await PostsModel.findByIdAndUpdate({ _id: id }, payload);
    res.send("post updated successfully");
  } catch (err) {
    console.log(err);
    res.send("cannot update");
  }
});

postRouter.delete("/delete/:id", async (req, res) => {
  let payload = req.body;
  let id = req.params.id;
  try {
    await PostsModel.findByIdAndDelete({ _id: id });
    res.send("post deleted successfully");
  } catch (err) {
    console.log(err);
    res.send("cannot delete");
  }
});

module.exports = {
  postRouter,
};
