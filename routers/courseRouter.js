const { Router }=require("express");
const courseRouter=Router();
const { courseModel }=require("../db");

courseRouter.post("/purchase",function(req,res){

})

courseRouter.post("/preview",function(req,res){
  
})

module.exports={
    courseRouter:courseRouter
}