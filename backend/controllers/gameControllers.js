const GameResult = require("../models/gameResult");

exports.saveNumberMatchResult = async (req, res) => {
  try {
    const { userId, score } = req.body;
    const result = new GameResult({
      userId,
      gameType: "numberMatch",
      score,
    });
    await result.save();
    res.status(201).json({ message: "Result saved successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.saveVisualAdditionResult = async (req, res) => {
  try {
    const { userId, score } = req.body;
    const result = new GameResult({
      userId,
      gameType: "visualAddition",
      score,
    });
    await result.save();
    res.status(201).json({ message: "Result saved successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.savePatternResult = async (req, res) => {
  try {
    const { userId, score } = req.body;
    const result = new GameResult({
      userId,
      gameType: "pattern",
      score,
    });
    await result.save();
    res.status(201).json({ message: "Result saved successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getGameResults = async (req, res) => {
  try {
    const { userId } = req.params;
    const results = await GameResult.find({ userId });
    res.status(200).json(results);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
