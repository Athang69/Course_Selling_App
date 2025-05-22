const { Router }=require("express");
const userRouter=Router();
const { z }=require("zod");
const bcrypt=require("bcrypt");
const { userModel }=require("../db");

userRouter.post("/signup",async function(req,res){
    const requiredBody=z.object({
        email:z.string().min(5).max(20).email(),
        password:z.string().min(8).max(25),
        firstName:z.string().min(5).max(25),
        lastName:z.string().min(5).max(25)
    })
    const parsesdData=requiredBody.safeParse(req.body);
    if(!parsesdData.success){
        res.json({
        message:"The format that you entered is incorrect",
        error:parsesdData.error.flatten().fieldErrors
    })
        return
    }
    const email=req.body.email;
    const password=req.body.password;
    const firstName=req.body.firstName;
    const lastName=req.body.lastName;

    let thrownError=false;
    try{
        const hashedPassword=await bcrypt.hash(password,5);
        await userModel.create({
            email:email,
            password:password,
            firstName:firstName,
            lastName:lastName
        })
    }
    catch (e){
        res.json({
            message:"User already exists"
        })
        thrownError=true;
    }
    if(!thrownError)
    {
        res.json({
            message:"You are signed up successfully"
        })
    }    
})

userRouter.post("/signin",function(req,res){
  
})

userRouter.post("/purchases",function(req,res){
  
})

module.exports={
    userRouter:userRouter
}