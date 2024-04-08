const router = require("express").Router()
const { stageController } = require("../controller");
const { upload } = require("../utils");

router.get("/pfebook", stageController.getPfeBooks)
router.post("/pfebook",upload.single("file"), stageController.createPfeBook)

router.post("/offre", stageController.createOffreStage);




module.exports = router