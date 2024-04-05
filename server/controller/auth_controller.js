const { User, Cv } = require("../models")
const {ApiError} = require("../utils")
const  { validateUser } = require("../validators")
const fs = require("fs")

const { genSalt, hashPassword, validatePassword } = require("../utils/password-utility")
const { generate_signature } = require("../utils/jwt")

module.exports.signup = async (req, res, next)=>{
    try {
        const existUser = await User.findOne({ email : req.body.email });
        if(existUser){
            throw new ApiError("Email already in use", 500);
        }
        
        if(!validateUser(req.body)){
         
            throw new ApiError("Please fill all fields", 400)
        }

        const salt = await genSalt();
        const hashed_pwd = await hashPassword(req.body.password, salt);
        
        
        const new_cv = await Cv.create({});
        await User.create({
            ...req.body, 
            salt : salt, 
            password: hashed_pwd,
            cv : new_cv,
            image : "avatar.jpg"

        });
        return res.status(200).send({ message : "user created"})
    } catch (error) {
        next(error)
    }
}

module.exports.login = async (req, res, next)=>{
    try {
        const {email, password} = req.body
        if(!email || !password ){
            throw new ApiError("Please enter a valid email Or password !");
        }
        const user = await User.findOne({ email : email });
        if(!user){
            throw new ApiError("User with this email not found", 404)
        }

        const isPasswordValid = await validatePassword(password, user.password, user.salt);
        if (!isPasswordValid) {
            throw new ApiError("Invalid email/Password", 500)
        }

        const { _id, fullName, role, image } = user;
        const signature = generate_signature({ _id, fullName, email });

        return res.status(200).send({ message : "authenticated successfully", data : { 
            token : signature, 
            id : _id, 
            fullName, 
            email, 
            role,
            image 
        } })
    } catch (error) {
        next(error)
    }
}