const jwt=require("jsonwebtoken");
const JWT_ADMIN_SECRET="s3cretforadmin";


function adminauth(req,res,next){
  const adminToken=req.headers.token;
  const decodedData2=jwt.verify(adminToken,JWT_ADMIN_SECRET);
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
  JWT_ADMIN_SECRET,
  adminauth
}