const { ROLES } = require("../models")

module.exports.adminMiddleware = (req, res, next)=>{
    const loggedUser = req.locals;
    console.log('loggedUser');
    console.log(loggedUser);
    if(user.role !== ROLES.admin){
       return  res.status(401).send({ message : "You're not authorized to see perform this action" })
    }
    next()
}