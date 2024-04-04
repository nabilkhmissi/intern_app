const { ROLES } = require("../models")

module.exports = async (req, res, next)=>{
    try {
        //req.locals contain an array of objects
        const loggedUser = res.locals.user[0];
        if(loggedUser.role != ROLES.admin){
           return  res.status(401).send({ message : "You're not authorized to see perform this action" })
        }
        next()
    } catch (error) {
        return  res.status(401).send({ message : error.message })
    }
}