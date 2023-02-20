const express = require("express");
const { UserModel } = require("../models/users.model");
const bcrypt = require("bcrypt");
const userRouter = express.Router();
const jwt=require("jsonwebtoken");
require("dotenv").config();

userRouter.post("/register", async (req, res) => {
  const { name, email, gender, password, age, city } = req.body;
  try {
    const user = await UserModel.find({ email });
    if(user.length>0){
      res.send("user already exist please login");
    }
    bcrypt.hash(password, 5, async (err, hash) => {
      if (err) {
        res.send("error");
      } else {
        const user = new UserModel({
          name,
          email,
          gender,
          password: hash,
          age,
          city,
        });
        await user.save();
        res.send("registered successfully");
      }
    });
  } catch (err) {
    console.log(err);
    res.send("registration failed");
  }
});

userRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
      const user =await UserModel.find({ email });
    if (user.length > 0) {
      bcrypt.compare(password, user[0].password, async (err, result) => {
        if (err) {
          res.send(err);
        } else if (result) {
            const token = jwt.sign({ userID:user[0]._id}, process.env.key);
          res.send({msg:"login scuccessfull",token});
        }
      });
    } else {
      res.send("user not found");
    }
  } catch (err) {
    console.log(err);
    res.send("something went wrong");
  }
});

module.exports = {
  userRouter,
};
