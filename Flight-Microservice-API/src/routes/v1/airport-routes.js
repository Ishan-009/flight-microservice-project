const express = require("express");
const { AirportController } = require("../../controller");
const router = express.Router();
const { AirportMiddleware } = require("../../middleware/index");

router.post(
  "/",
  AirportMiddleware.validateCreateRequest,
  AirportController.createAirport
);

router.get("/", AirportController.getAirports);
router.get("/:id", AirportController.getAirport);
router.delete("/:id", AirportController.deleteAirport);
router.put(
  "/:id",
  AirportMiddleware.validateCreateRequest,
  AirportController.updateAirport
);

// Export the router
module.exports = router;
