const express = require("express");
const router = express.Router();
const { EmailController } = require("../../controller/index");

router.post("/", EmailController.createTicket);

// Export the router
module.exports = router;
