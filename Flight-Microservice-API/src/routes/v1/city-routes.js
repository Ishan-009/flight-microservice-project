const express = require("express");
const { CityController } = require("../../controller");
const router = express.Router();
const { CityMiddleware } = require("../../middleware/index");

router.post(
  "/",
  CityMiddleware.validateCreateRequest,
  CityController.createCity
);

// router.get("/", CityController.getAirplanes);
// router.get("/:id", AirplaneController.getAirplane);
// router.delete("/:id", AirplaneController.deleteAirplane);
// router.put(
//   "/:id",
//   AirplaneMiddleware.validateCreateRequest,
//   AirplaneController.updateAirplane
// );

// Export the router
module.exports = router;
