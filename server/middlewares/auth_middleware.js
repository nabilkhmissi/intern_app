const { User } = require("../models")
const { ApiError, jwt } = require("../utils")


module.exports = async (req, res, next)=>{
    try {
        let token = req.headers.authorization;
        if(!token || !token.startsWith("Bearer")){
            throw new ApiError("You have to login to perform this action", 403)
        } 

        token = token.split(" ")[1];

        //validate token
        if(!jwt.validate_token(token)){
            throw new ApiError("Invalid token", 403)
        }

        // Verify token
        const decoded = jwt.decodeToken(token);
        const user = await User.find({ email : decoded.email });
        
        if(!user){
            throw new ApiError("You have to login to perform this action", 403)
        }

        res.locals.user = user;
        next()
    } catch (error) {
        res.status(403).send({ message : error.message }) 
    }
}