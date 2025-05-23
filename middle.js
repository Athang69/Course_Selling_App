const jwt=require("jsonwebtoken");
const JWT_USER_SECRET="s3cretforuser";
const JWT_ADMIN_SECRET="s3cretforadmin";

function userauth (req,res,next){
  const userToken=req.headers.token;
  const decodedData=jwt.verify(userToken,JWT_USER_SECRET);
  if(decodedData)
  {
    req.userId=decodedData.Id;
    next();
  }
  else{
    res.status(403).json({
      message:"Invalid login credentials for user"
    })
  }

}

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
  JWT_USER_SECRET,
  JWT_ADMIN_SECRET
}