import User from '../model/user.model.js';
import bcrypt from 'bcryptjs'
import { createdAccessToken } from '../libs/jwt.js'
export const signup = async(req, res, next) => {
    const { email, password, username } = req.body;

    try {
        const passwordHash = await bcrypt.hash(password, 10)
        const newUser = new User({
            email,
            password: passwordHash,
            username,
        })
       await newUser.save();
        res.status(201).json('User saved successfully')
    } catch (error) {
        next(error);
        
        
    }
};








    


