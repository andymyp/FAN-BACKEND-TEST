const router = require("express").Router();
const controller = require("../controllers/epresence");

router.post("/epresence", controller.createEpresence);
router.get("/epresence", controller.getEpresences);
router.get("/supervisor/epresence", controller.getUserEpresences);
router.get("/supervisor/epresence/group", controller.getUserEpresencesGroup);
router.patch(
  "/supervisor/epresence/:id/approve",
  controller.updateApproveStatus
);

module.exports = router;
