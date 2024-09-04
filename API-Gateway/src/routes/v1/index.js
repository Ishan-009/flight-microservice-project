const express = require("express");
const router = express.Router();
const userRoutes = require("./user-routes");
const { InfoController } = require("../../controller");
const { AuthMiddleware } = require("../../middleware/index");

router.use("/users", userRoutes);
// Testing API LIve
router.get("/info", AuthMiddleware.checkAuth, InfoController.info);
module.exports = router;
