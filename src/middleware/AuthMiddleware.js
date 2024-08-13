import jwt from "jsonwebtoken";
import messages from "./../utils/mensages.js"
export const PRIVATE_KEY = '1010FFF'


const AuthMiddleware = (req,res,next) => {
  
  
  
  try {
    const header = req.headers['authorization'];
  
    if(typeof header !== 'undefined') {
        const bearer = header.split(' ');
        const token = bearer[1];
        const payload = jwt.verify(token, PRIVATE_KEY);
        if(payload){
          return next();
        }
      }

    return res.status(401).json({ message: messages.httpCodes[401]});
 
  } catch(error) {
    return res.status(401).json({ message: messages.httpCodes[401]});
  }
}

export default AuthMiddleware;