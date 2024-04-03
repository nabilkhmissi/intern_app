const router = require("express").Router()
const auth_controller = require("../controller/auth_controller")
const { authMiddleware } = require("../middlewares")

router.post("/signup", auth_controller.signup)
router.post("/login", auth_controller.login)
router.get("/test", authMiddleware , auth_controller.test)


module.exports = router