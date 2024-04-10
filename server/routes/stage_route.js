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




module.exports = router