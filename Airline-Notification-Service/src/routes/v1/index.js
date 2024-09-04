const express = require("express");
const { InfoController, EmailController } = require("../../controller");
const router = express.Router();
const ticketRoutes = require("./ticket-routes");
router.get("/info", InfoController.info);
router.use("/tickets", ticketRoutes);
module.exports = router;
