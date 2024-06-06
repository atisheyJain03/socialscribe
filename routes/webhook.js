const express = require("express");
const { rssWebhoook } = require("../controller/webhookController");
const router = express.Router();

// Middleware to parse JSON bodies
router.use(express.json());

router.post("/rss", rssWebhoook);

module.exports = router;
