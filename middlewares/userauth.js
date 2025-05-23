const jwt=require("jsonwebtoken");
const JWT_USER_SECRET="s3cretforuser";

function userauth (req,res,next){
  const userToken=req.headers.token;
  const decodedData=jwt.verify(userToken,JWT_USER_SECRET);
  if(decodedData)
  {
    req.userId=decodedData.id;
    next();
  }
  else{
    res.status(403).json({
      message:"Invalid login credentials for user"
    })
  }

}
module.exports={
  jwt,
  JWT_USER_SECRET,
  userauth
}