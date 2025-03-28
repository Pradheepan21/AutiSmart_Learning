const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authmiddleware");
const {
  saveNumberMatchResult,
  saveVisualAdditionResult,
  savePatternResult,
  getGameResults,
} = require("../controllers/gameControllers");

router.post("/number-match", protect, saveNumberMatchResult);
router.post("/visual-addition", protect, saveVisualAdditionResult);
router.post("/pattern", protect, savePatternResult);
router.get("/results/:userId", protect, getGameResults);

module.exports = router;
