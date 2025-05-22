const jwt=require("jsonwebtoken");
const JWT_SECRET="s3cret";

function userauth (req,res,next){
  const userToken=req.headers.token;
  const decodedData=jwt.verify(token,JWT_SECRET);
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
  const decodedData2=jwt.verify(TokenExpiredError,JWT_SECRET);
  if(decodedData2){
    req.adminId=decodedData2.indexOf;
    next();
  }
  else{
    res.status(403).json({
      message:"Invalid Login credentials for admin"
    })
  }
}