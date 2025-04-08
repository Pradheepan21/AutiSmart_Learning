const GameResult = require("../models/gameResult");

const getProgressByUser = async (req, res) => {
  try {
    const userId = req.params.userId;
    const results = await GameResult.find({ userId }).sort({ date: 1 });

    const grouped = {
      numberMatch: [],
      visualAddition: [],
      pattern: [],
    };

    const badgeSet = new Set();
    const gamesPlayed = new Set();
    let totalAttempts = 0;

    const checkBadges = (gameResults) => {
      for (let i = 0; i < gameResults.length; i++) {
        const score = gameResults[i].score;
        totalAttempts++;

        if (score >= 5) badgeSet.add("Bronze Star");
        if (score >= 8) badgeSet.add("Silver Star");

        if (i >= 1 && gameResults[i].score - gameResults[i - 1].score >= 4) {
          badgeSet.add("Fast Learner");
        }
      }
    };

    results.forEach(result => {
      if (grouped[result.gameType]) {
        grouped[result.gameType].push({
          score: result.score,
          date: result.date,
        });
        gamesPlayed.add(result.gameType);
      }
    });

    checkBadges(grouped.numberMatch);
    checkBadges(grouped.visualAddition);
    checkBadges(grouped.pattern);

    if (gamesPlayed.size === 3) badgeSet.add("Game Explorer");
    if (totalAttempts >= 10) badgeSet.add("Brain Builder");

    res.status(200).json({ ...grouped, badges: Array.from(badgeSet) });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch progress data" });
  }
};

module.exports = { getProgressByUser };
