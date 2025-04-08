const express = require("express");
const { getProgressByUser } = require("../controllers/progressController");
const { protect } = require("../middleware/authmiddleware");

const router = express.Router();

router.get("/:userId", protect, getProgressByUser);

module.exports = router;
