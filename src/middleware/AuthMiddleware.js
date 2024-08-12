import jsonwebtoken from "jsonwebtoken";
import messages from "./../utils/mensages.js"
export const PRIVATE_KEY = '1010FFF'


const AuthMiddleware = (req,res,next) => {

  const [, token] = req.headers.authorization?.split(' ') || [' ', ' '];
  
  
  try {
    if(!token || token == null || token == undefined){

      return res.status(401).json({ message: messages.httpCodes[401]});
    } 
    const payload = jsonwebtoken.verify(token, PRIVATE_KEY);
    console.log(payload);
    const userIdFromToken = typeof payload !== 'string' && payload.user;

    if(!user && !userIdFromToken) {
      return res.send(401).json({ message: messages.httpCodes[401]});
    }

    req.headers['user'] = payload.user;

    return next();
  } catch(error) {
    return res.status(401).json({ message: messages.httpCodes[401]});
  }
}

export default AuthMiddleware;