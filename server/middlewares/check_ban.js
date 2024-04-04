module.exports = async (req, res, next)=>{
    try {
        const loggedUser = res.locals.user[0];
        //res.locals contain an array of objects
        if(loggedUser && loggedUser.isBanned){
           return  res.status(401).send({ message : "You're banned from using this platform" })
        }
        next()
    } catch (error) {
        return  res.status(500).send({ message : error.message })
        
    }
}