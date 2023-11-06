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



export const signin = async(req, res) => {
    const { email, password } = req.body;

    try {

        const  UserFound = await User.findOne({ email })

        if (!UserFound) return   res.status(404).json({message: 'User not found'})

        const isMatch = await bcrypt.compare(password, UserFound.password);
        if (!isMatch) res.status(404).json({message: 'unauthorized'})
            
     
        const token = await createdAccessToken({ id: UserFound._id });
        const { password: pass, ...rest } = UserFound._doc
        res.cookie('token', token, {httpOnly: true}).status(200).json(rest);
       /* res.json({
            id: UserFound._id,
            email: UserFound.email,
            username: UserFound.username,
            createdAt: UserFound.createdAt,
            updateAt: UserFound.updateAt,
        });*/
    } catch (error) {
        res.status(500).json({message: error.message})
        
    }
};






    


