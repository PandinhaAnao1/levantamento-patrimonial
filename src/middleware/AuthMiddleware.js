import jsonwebtoken from "jsonwebtoken";
import messages from "./../utils/mensages.js"
export const PRIVATE_KEY = '1010FFF'
export const user = {
  name: 'Filipe Sousa',
  email: 'filipe@exmaple.com'
}

const AuthMiddleware = (req,res,next) => {

  const [, token] = req.headers.authorization?.split(' ') || [' ', ' '];
  
  if(!token) return res.status(401).json({ message: messages.httpCodes[401]});

  try {
    const payload = jsonwebtoken.verify(token, PRIVATE_KEY);
    const userIdFromToken = typeof payload !== 'string' && payload.user;

    if(!user && !userIdFromToken) {
      return res.send(401).json({ message: messages.httpCodes[401]});
    }

    req.headers['user'] = payload.user;

    return next();
  } catch(error) {
    console.log(error);
    return res.status(401).json({ message: messages.httpCodes[401]});
  }
}

export default AuthMiddleware;