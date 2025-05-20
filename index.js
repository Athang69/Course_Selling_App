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
  await mongoose.connect("mongodb+srv://admin:G6DYMcoVxzyeXXmj@athangop.uvy3cuw.mongodb.net/course_sellling_app")
  app.listen(3000);
  console.log("listening to port 3000")
}

main();