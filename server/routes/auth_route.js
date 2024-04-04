const router = require("express").Router()
const auth_controller = require("../controller/auth_controller")
const { upload } = require("../utils");

router.post("/signup",upload.single("image"), auth_controller.signup)
router.post("/login", auth_controller.login)


module.exports = router