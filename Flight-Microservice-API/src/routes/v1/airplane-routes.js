const express = require("express");
const { AirplaneController } = require("../../controller");
const router = express.Router();
const { AirplaneMiddleware } = require("../../middleware/index");

router.post(
  "/",
  AirplaneMiddleware.validateCreateRequest,
  AirplaneController.createAirplane
);

router.get("/", AirplaneController.getAirplanes);
router.get("/:id", AirplaneController.getAirplane);
router.delete("/:id", AirplaneController.deleteAirplane);
router.put(
  "/:id",
  AirplaneMiddleware.validateCreateRequest,
  AirplaneController.updateAirplane
);

// Export the router
module.exports = router;
