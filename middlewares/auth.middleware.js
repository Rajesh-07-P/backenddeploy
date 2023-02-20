const jwt = require("jsonwebtoken");
require("dotenv").config();

const authentication = (req, res, next) => {
    const token=req.headers.auth;
  jwt.verify(token, process.env.key,async(err, decoded)=>{
    if(err){
        res.send("please login");
    }else{
        req.body.userID=decoded.userID;
        next();
    }
  });
};


module.exports={
    authentication
}