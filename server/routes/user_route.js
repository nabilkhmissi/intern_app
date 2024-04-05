const router = require("express").Router();
const { checkAdminMiddleware } = require("../middlewares")

const { userController, cvController } = require("../controller")
const { upload } = require("../utils");

router.get("", checkAdminMiddleware, userController.findAll)
router.get("/stagiaires", userController.findAllStagiaires)
router.get("/banned", userController.findBannedUsers)
router.get("/inactive", userController.findInactiveUsers)
router.get("/:id/ban", userController.banUser)
router.get("/:id/enable", userController.enableUser)
router.put("/:id/profile/avatar",upload.single("image"), userController.updateAvatar)

router.post("/role/update", userController.updateRole)
router.post("/password/update", userController.updatePassword)
router.put("/:id", upload.single("image"), userController.updateUser)

router.get("/:id", userController.findById)

//cv fonctionnalities

router.get("/:id/cv", cvController.findCvByUserId)

//educations route
router.post("/:userId/cv/educations", cvController.addEducation)
router.delete("/:userId/cv/educations/:id", cvController.deleteEducation)
router.put("/:userId/cv/educations/:id", cvController.updateEducation)
//experiences route
router.post("/:userId/cv/experiences", cvController.addExperience)
router.delete("/:userId/cv/experiences/:id", cvController.deleteExperience)
router.put("/:userId/cv/experiences/:id", cvController.updateExperience)
// skill route
router.post("/:userId/cv/skills", cvController.addSkill)
router.delete("/:userId/cv/skills/:id", cvController.deleteSkill)
router.put("/:userId/cv/skills/:id", cvController.updateSkill)

//certification route
router.post("/:userId/cv/certifications", cvController.addCertification)
router.delete("/:userId/cv/certifications/:id", cvController.deleteCertification)
//projects route
router.post("/:userId/cv/projects", cvController.addProject)
router.delete("/:userId/cv/projects/:id", cvController.deleteProject)
router.put("/:userId/cv/projects/:id", cvController.updateProject)




module.exports = router