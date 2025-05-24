const { Router }=require("express");
const userRouter=Router();
const { z }=require("zod");
const bcrypt=require("bcrypt");
const { userModel }=require("../db");
const mongoose=require("mongoose");
const {jwt,userauth}=require("../middlewares/userauth");
require('dotenv').config()

userRouter.post("/signup",async function(req,res){
    const requiredBody=z.object({
        email:z.string().min(5).max(50).email(),
        password:z.string().min(8).max(25),
        firstName:z.string().min(5).max(25),
        lastName:z.string().min(5).max(25)
    })
    const parsedData=requiredBody.safeParse(req.body);
    if(!parsedData.success){
        res.json({
        message:"The format that you entered is incorrect",
        error:parsedData.error.flatten().fieldErrors
    })
        return
    }
    const { email,password,firstName,lastName }=parsedData.data;

    try{
        const existingUser=await userModel.findOne({ email })
        if(existingUser){
            res.status(409).json({
                message:"The user already exists please try again with a new email ID"
            })
        }
        else{
            res.status(200).json({
                message:"You are successfully signed up"
            })
        }
        
        const hashedPassword=await bcrypt.hash(password,5);    

        await userModel.create({
            email,
            password:hashedPassword,
            firstName,
            lastName
        });
        } catch (e){
        console.error("Signup error",e);
        return res.status(500).json({
            message:"Internal server error"
        })
    }
   
})

userRouter.post("/signin",async function(req,res){
    const email=req.body.email;
    const password=req.body.password;
    const user=await userModel.findOne({
        email:email
    })
    if(!user){
        res.status(403).json({
            message:"The user dosnt exist in our database"
        })
        return
    }
    const passMatch=await bcrypt.compare(password,user.password);
    if(passMatch){
        const token=jwt.sign({
            id:user._id.toString()
        },JWT_USER_SECRET)
        res.json({
            token:token
        })
    }
    else{
        res.status(403).json({
            message:"Invalid credentials"
        })
    }
})

userRouter.post("/purchases",function(req,res){
  
})

module.exports={
    userRouter:userRouter
}