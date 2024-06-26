const router = require("express").Router()
const { stageController } = require("../controller");
const { upload } = require("../utils");

router.get("/pfebook", stageController.getPfeBooks)
router.post("/pfebook",upload.single("file"), stageController.createPfeBook)

// ================= Offre de stage =======================
router.post("/offres", stageController.createOffreStage);
router.get("/offres", stageController.findAllOffres);
router.delete("/offres/:id", stageController.deleteOffer);
router.put("/offres/:id", stageController.updateOffer);
router.get("/offres/:id/apply/user/:userId", stageController.apply)

// ================= Applications =======================
router.get("/applications", stageController.getAllApplications)
router.get("/applications/user/:userId", stageController.findApplicationsByUserId)
//admin only can approve
router.get("/applications/:id/actions/:action", stageController.handleApplication)
router.post("/applications/:id/encadrant/set", stageController.setEncadrant)
// ================= Applications Tasks =======================
router.post("/applications/:id/tasks", stageController.createTask)
router.get("/applications/:id/tasks", stageController.getApplicationTasks)

router.delete("/tasks/:id", stageController.deleteTask)
router.get("/tasks/:id/complete", stageController.completeTask)



module.exports = router