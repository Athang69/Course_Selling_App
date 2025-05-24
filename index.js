require('dotenv').config()
const express=require("express");
const { userRouter }=require("./routers/userRouter");
const { courseRouter }=require("./routers/courseRouter");
const { adminRouter }=require("./routers/adminRouter");
const app=express();
app.use(express.json());
const mongoose=require("mongoose")
app.use("/user",userRouter);
app.use("/course",courseRouter);
app.use("/admin",adminRouter)


async function main(){
  await mongoose.connect(process.env.MONGO_URL)
  app.listen(3000);
  console.log("listening to port 3000")
}

main();