const Router=require("express");
const adminRouter=Router();
const{ adminModel }=require("../db")
const { z }=require("zod");
const bcrypt=require("bcrypt");
const {jwt,JWT_ADMIN_SECRET}=require("../middlewares/adminauth")


adminRouter.post("/signup",async function(req,res){
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
        const existingadmin=await adminModel.findOne({ email })
        if(existingadmin){
            res.status(409).json({
                message:"The admin already exists please try again with a new email ID"
            })
        }
        else{
            res.status(200).json({
                message:"You are successfully signed up"
            })
        }
        
        const hashedPassword=await bcrypt.hash(password,5);    

        await adminModel.create({
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

adminRouter.post("/signin",async function(req,res){
      const email=req.body.email;
      const password=req.body.password;
      const admin=await adminModel.findOne({
          email:email
      })
      if(!admin){
          res.status(403).json({
              message:"The admin dosnt exist in our database"
          })
          return
      }
      const passMatch=await bcrypt.compare(password,admin.password);
      if(passMatch){
          const token=jwt.sign({
              id:admin._id.toString()
          },JWT_ADMIN_SECRET)
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

adminRouter.put("/course",function(req,res){
  
})

adminRouter.get("/course/bulk",function(req,res){
  
})

module.exports={
  adminRouter
}