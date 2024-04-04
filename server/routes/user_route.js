const router = require("express").Router();

const { userController } = require("../controller")
const { authMiddleware } = require("../middlewares")

router.get("", authMiddleware, userController.findAll)
router.get("/stagiaires", authMiddleware, userController.findAllStagiaires)
router.get("/banned", authMiddleware, userController.findBannedUsers)
router.get("/inactive", authMiddleware, userController.findInactiveUsers)
router.get("/ban/:id", authMiddleware, userController.banUser)
router.get("/enable/:id", authMiddleware, userController.enableUser)

router.post("/role/update", authMiddleware, userController.updateRole)
router.post("/password/update", authMiddleware, userController.updatePassword)

router.get("/:id", authMiddleware, userController.findById)




module.exports = router