const express = require("express");
const router = express.Router();

router.get("/info", (req, res) => {
  res.json({ message: "Info Version 2 API Route" });
});

// Export the router
module.exports = router;
