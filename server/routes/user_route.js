const router = require("express").Router()


router.post("/signup", (req, res)=>{
    console.log(req.body)
    return res.status(200).send({ message : "user created" })
})


module.exports = router