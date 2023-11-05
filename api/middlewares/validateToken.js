import jwt from 'jsonwebtoken'
import config from '../config.js';
export const authRequired = (req, res, next) =>{

    const {token} = req.cookies;

    if(!token)
    return res.status(401).json({message: "Invalid token"});

    jwt.verify(token, config.jwtSecret, (err, user) =>{
         if(err) return res.status(403).json({message: err.message});

         req.user = user;

         next();
    })
}