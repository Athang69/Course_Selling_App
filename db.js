const mongoose=require("mongoose");
const Schema=mongoose.Schema;
const ObjectId=mongoose.ObjectId;
const users=new Schema({
  userId:ObjectId,
  email:{type:String, unique:true},
  password:String,
  firstName:String,
  lastName:String
})

const Course=new Schema({
  courseId:ObjectId,
  title:String,
  description:String,
  price:Number,
  imageURL:String,
  createrId:ObjectId
})

const Admin=new Schema({
  adminId:ObjectId,
  email:{type:String,unique:true},
  password:String,
  firstName:String,
  lastName:String
})

const purchases=new Schema({
  id:ObjectId,
  courseId:ObjectId,
  userId:ObjectId
})

const userModel=mongoose.model("users",users);
const adminModel=mongoose.model("admin",Admin);
const courseModel=mongoose.model("courses",Course);
const purchaseModel=mongoose.model("purchases",purchases);

exports.module={
  userModel,
  adminModel,
  courseModel,
  purchaseModel
}