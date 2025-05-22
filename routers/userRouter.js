const { Router }=require("express");
const userRouter=Router();
const { userModel }=require("../db");

userRouter.post("/signup",function(req,res){
    res.json({
        message:"Hello"
    })
})

userRouter.post("/signin",function(req,res){
  
})

userRouter.post("/purchases",function(req,res){
  
})

module.exports={
    userRouter:userRouter
}