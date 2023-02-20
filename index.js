const express=require("express");
const { connection } = require("./config/db");
const { authentication } = require("./middlewares/auth.middleware");
const { postRouter } = require("./routes/posts.route");
const { userRouter } = require("./routes/user.route");
require("dotenv").config();
const cors=require("cors");


const app=express();
app.use(express.json());
app.use(cors());


app.get('/',(req,res)=>{
    res.send("Home Page");
})

app.use("/users",userRouter);
app.use(authentication);
app.use("/posts",postRouter);

app.listen(process.env.port,async()=>{
    try{
        await connection;
        console.log("connected to db");
    }catch(err){
        console.log(err);
        console.log("trouble in connecting to db")
    }
    console.log(`server started at port ${process.env.port}`);
})


// {
//   "name": "Rajesh",
//   "email": "rajesh@gmail.com",
//   "gender": "Male",
//   "password": "rajesh@123",
//   "age": 27,
//   "city": "hanamkonda"
// }