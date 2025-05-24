const jwt=require("jsonwebtoken");
require('dotenv').config()


function adminauth(req,res,next){
  const adminToken=req.headers.token;
  const decodedData2=jwt.verify(adminToken,process.env.JWT_ADMIN_SECRET);
  if(decodedData2){
    req.adminId=decodedData2.Id;
    next();
  }
  else{
    res.status(403).json({
      message:"Invalid Login credentials for admin"
    })
  }
}

module.exports={
  jwt,
  adminauth
}