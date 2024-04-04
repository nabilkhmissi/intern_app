const router = require("express").Router();
const { checkAdminMiddleware } = require("../middlewares")

const { userController, cvController } = require("../controller")
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

//cv fonctionnalities

router.post("/cv/educations", cvController.addEducation)
router.post("/cv/certifications", cvController.addCertification)
router.post("/cv/experiecnes", cvController.addExperience)
router.post("/cv/skills", cvController.addSkill)
router.post("/cv/projects", cvController.addProject)




module.exports = router