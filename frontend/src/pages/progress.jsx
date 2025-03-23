import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

export function Progress() {
  const navigate = useNavigate();

  // Mock progress data (Replace with actual data from DB in future)
  const progressData = [
    { date: "2024-02-10", score: 2, reward: "🌟 Beginner" },
    { date: "2024-02-12", score: 4, reward: "🎖️ Bronze Math Master" },
    { date: "2024-02-14", score: 5, reward: "🏅 Silver Math Champ" },
    { date: "2024-02-16", score: 3, reward: "🌟 Keep Improving!" },
    { date: "2024-02-18", score: 6, reward: "🥇 Gold Star Genius!" },
  ];

  // Function to generate comments based on progress trend
  const generateComment = () => {
    const lastScore = progressData[progressData.length - 1].score;
    if (lastScore <= 2) return "You're just getting started! Keep practicing! 🚀";
    if (lastScore <= 4) return "You're improving! Keep up the great work! 🌟";
    if (lastScore <= 6) return "You're doing amazing! You're a math champ! 🏆";
    return "You're unstoppable! Keep pushing to the top! 🔥";
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-8 bg-yellow-100"> {/* ✅ Removed BG Image */}
      
      {/* Content Wrapper */}
      <div className="relative z-10 text-center bg-white p-8 rounded-2xl shadow-xl border-4 border-yellow-400 w-full max-w-2xl">
        
        {/* Title Section */}
        <h1 className="text-4xl font-bold text-yellow-800 animate-bounce">📊 Progress Report</h1>

        {/* Latest Progress Details */}
        <div className="bg-yellow-200 p-6 mt-6 rounded-2xl shadow-lg border-4 border-yellow-500">
          <h2 className="text-2xl font-bold text-gray-800">Latest Progress</h2>
          <p className="text-lg text-gray-700 mt-2">Score: {progressData[progressData.length - 1].score} ⭐</p>
          <p className="text-lg text-gray-700">Reward: {progressData[progressData.length - 1].reward}</p>
        </div>

        {/* Progress History */}
        <div className="mt-6 p-6 bg-blue-100 rounded-2xl shadow-lg border-4 border-blue-400">
          <h2 className="text-xl font-bold text-blue-800">📅 Full Progress History</h2>
          <ul className="mt-3 text-lg text-gray-700">
            {progressData.map((entry, index) => (
              <li key={index} className="mt-2 p-2 bg-white rounded-lg shadow-md">
                <span className="font-bold">{entry.date}</span>: {entry.score} ⭐ - {entry.reward}
              </li>
            ))}
          </ul>
        </div>

        {/* Comment Section Based on Progress */}
        <div className="mt-6 bg-green-200 p-6 rounded-2xl shadow-lg border-4 border-green-400">
          <h2 className="text-xl font-bold text-green-800">📢 Teacher's Feedback</h2>
          <p className="text-lg text-gray-700 italic mt-2">"{generateComment()}"</p>
        </div>

        {/* Back to Profile Button */}
        <button 
          onClick={() => navigate('/profile')} 
          className="mt-6 px-8 py-3 bg-blue-500 text-white text-xl font-bold rounded-full shadow-md hover:bg-blue-600 transition-transform transform hover:scale-105"
        >
          🔙 Back to Profile
        </button>

      </div>
    </div>
  );
}
