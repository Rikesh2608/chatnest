import jwt from "jsonwebtoken";

const authMiddleWare = async (req, res, next) => {
  const { token } = req.headers;

  if (!token) {
    console.log("Not authorized");
    return res.json({ success: false, message: "Not Authorized, Login First" });
  } 
  try { 
    const token_decode = jwt.verify(token, "random#secret"); 
    req.body.userId = token_decode.id; 
    next(); 
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Something Went Wrong", error });
  } 
}; 

export { authMiddleWare };
