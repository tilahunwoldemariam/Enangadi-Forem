const {StatusCodes} = require("http-status-codes");
const jwt = require("jsonwebtoken")
async function authMidleWare(req, res, next) {
   const authHeader = req.headers.authorization 
   if(!authHeader || !authHeader.startsWith('Bearer')){
    return res.status(StatusCodes.UNAUTHORIZED).json({msg:"Authentication field"})
   }
 const token = authHeader.split(" ")[1];
//  console.log(authHeader);
//  console.log(token);
   try {
    const {username, userid} = jwt.verify(token, "secret");
    // res.status(StatusCodes.OK).json({data})
    req.user = {username, userid}
    next()
   } catch (error) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ msg: "Authentication field" });
   }
}
module.exports = authMidleWare;