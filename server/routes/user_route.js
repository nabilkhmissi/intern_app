const router = require("express").Router();
const { checkAdminMiddleware } = require("../middlewares")

const { userController } = require("../controller")
const { upload } = require("../utils");

router.get("", checkAdminMiddleware, userController.findAll)
router.get("/stagiaires", userController.findAllStagiaires)
router.get("/banned", userController.findBannedUsers)
router.get("/inactive", userController.findInactiveUsers)
router.get("/ban/:id", userController.banUser)
router.get("/enable/:id", userController.enableUser)

router.post("/role/update", userController.updateRole)
router.post("/password/update", userController.updatePassword)
router.put("/:id", upload.single("image"), userController.updateUser)

router.get("/:id", userController.findById)




module.exports = router