const mongoose = require("mongoose");

const gameResultSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  gameType: {
    type: String,
    enum: ["numberMatch", "visualAddition", "pattern"],
    required: true,
  },
  score: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("GameResult", gameResultSchema);
