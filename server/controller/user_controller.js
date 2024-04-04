const { User, ROLES } = require("../models")
const user = require("../models/user")
const { ApiError, password_utility } = require("../utils")
const { validateUser } = require("../validators")

module.exports.findAll = async (req, res)=>{
    const users = await User.find();
    return res.status(200).send({ message : "users found successfully", data : users })
}

module.exports.findAllStagiaires = async (req, res)=>{
    const stagiaires = await User.find({ role : ROLES.user });
    return res.status(200).send({ message : "stagiaires found successfully", data : stagiaires })
}

module.exports.findBannedUsers = async (req, res)=>{
    const bannedUsers = await User.find({ isBanned : true });
    return res.status(200).send({ message : "banned users found successfully", data : bannedUsers })
}

module.exports.findInactiveUsers = async (req, res)=>{
    const inactiveUsers = await User.find({ isActive : false });
    return res.status(200).send({ message : "inactive users found successfully", data : inactiveUsers })
}

//ban and unban user

module.exports.banUser = async (req, res)=>{
    const id = req.params.id;
    if(!id){
        throw new ApiError("Select a valid user ID", 404);
    }

    const userToBan = await User.findById(id);
    userToBan.isBanned = !userToBan.isBanned;
    const updatedUser = await userToBan.save();
    if(updatedUser.isBanned){
        return res.status(200).send({ message : "User banned successfully" })
    }
    return res.status(200).send({ message : "User unbanned successfully" })

}

//enable and disable a user

module.exports.enableUser = async (req, res, next)=>{
    console.log("enable user ")
    try {
        const id = req.params.id;
        if(!id){
            throw new ApiError("Select a valid user ID", 404);
        }
        
        const user = await User.findById(id);
        user.isEnabled = !user.isEnabled;
        const updatedUser = await user.save();
        if(updatedUser.isEnabled){
            return res.status(200).send({ message : "User enabled successfully" })
        }
        return res.status(200).send({ message : "User disabled successfully" })
        
    } catch (error) {
     next();   
    }
}


// update user role

module.exports.updateRole = async (req, res, next)=>{
    console.log("update role")
    try {
        const {id, role} = req.body;
        if(!id){
            throw new ApiError("Select a valid user ID", 404);
        }
        if(!role){
            throw new ApiError("Select a valid role", 404);
        }
        
        const user = await User.findById(id);
        user.role = role;
        await user.save();
        return res.status(200).send({ message : "Role updated successfully" })
        
    } catch (error) {
        next()
    }
}
    //change password

module.exports.updatePassword = async (req, res, next)=>{
    console.log("update password")
    try {
        const {id, oldPassword, newPassword, confirmNewPassword} = req.body;
        console.log(id, oldPassword, newPassword, confirmNewPassword)
        if(!id){
            throw new ApiError("Select a valid user ID", 400);
        }
        
        if(!oldPassword || !newPassword || !confirmNewPassword){
            throw new ApiError("Please provide a valid password", 400);
        }
        
        console.log("finding user")
        const user = await User.findById(id);


    const isSameOldPassword = await password_utility.validatePassword(oldPassword, user.password, user.salt);
        

        if(!isSameOldPassword){
            throw new ApiError("Password doesn't match, try again", 400);
        }
        
        if(newPassword !== confirmNewPassword){
        throw new ApiError("Please confirm your password", 400);
    }
    
    user.password = await password_utility.hashPassword(newPassword, user.salt);
    
    const updatedUser = await user.save();
    return res.status(200).send({ message : "Password updated successfully" })
    
    } catch (error) {
        next(error)
    }
}

    //find by id

    module.exports.findById = async (req, res, next)=>{
        try {
            const id = req.params.id
            if(!id){
                throw new ApiError("Select a valid user ID", 400);
            }
            
            const user = await User.findById(id);
            return res.status(200).send({ message : "User retrieved successfully", data : user })
        
        } catch (error) {
            next(error)
        }
    }
    

     //update user

     module.exports.updateUser = async (req, res, next)=>{
        try {
            const id = req.params.id
            if(!id){
                throw new ApiError("Select a valid user ID", 400);
            }
            const isUserValid = validateUser(req.body);
            if (req.file.filename) {
                req.body.image = req.file.filename;
            }
            if(!isUserValid){
                throw new ApiError("Please fill all fields", 400)
            }
            //todo remove old image fromfolder
            const updatedUser = await User.findByIdAndUpdate(id, { $set: req.body });
            return res.status(200).send({ message : "User updated successfully", data : updatedUser })
        
        } catch (error) {
            next(error)
        }
    }
    