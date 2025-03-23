import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export function Game() {
  const navigate = useNavigate();
  const [videoLinks, setVideoLinks] = useState([]);
  const [selectedGame, setSelectedGame] = useState(null);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [correctAnswer] = useState(4); // Used in Game 2: Visual Addition

  useEffect(() => {
    fetch("/video.json")
      .then((response) => response.json())
      .then((data) => setVideoLinks(Array.isArray(data) ? data : []))
      .catch((error) => console.error("Error loading videos:", error));
  }, []);

  useEffect(() => {
    if (selectedGame) {
      const timer = setInterval(() => {
        setTimeLeft((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [selectedGame]);

  const playRandomVideo = () => {
    if (videoLinks.length > 0) {
      const shuffledVideos = [...videoLinks].sort(() => Math.random() - 0.5);
      const selectedVideo = shuffledVideos[0]
        .replace("youtu.be/", "www.youtube.com/embed/")
        .replace("/shorts/", "/embed/");
      navigate(`/play-video?videoUrl=${encodeURIComponent(selectedVideo)}`);
    } else {
      console.error("No videos available to play");
    }
  };

  const handleAnswerClick = (answer) => {
    if (answer === correctAnswer) {
      setScore(score + 1);
    }
  };

  return (
    <div className="bg-gradient-to-b from-blue-100 to-white min-h-screen flex flex-col items-center">
      
      {/* Title Section */}
      <div className="text-center p-8">
        <h1 className="text-4xl font-bold text-blue-800 animate-bounce">🎮 Math Game Challenge!! 🎈</h1>
        <p className="text-lg text-blue-600 mt-2 font-semibold">Choose your game and start playing!!! 🚀</p>
      </div>

      {/* Game Selection */}
      {!selectedGame && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
          <button onClick={() => setSelectedGame('numberMatch')} className="bg-pink-400 text-white px-6 py-4 text-xl rounded-xl shadow-lg hover:bg-pink-500 transition">
            🍎 Number Match Game
          </button>
          <button onClick={() => setSelectedGame('addition')} className="bg-green-400 text-white px-6 py-4 text-xl rounded-xl shadow-lg hover:bg-green-500 transition">
            ➕ Visual Addition Game
          </button>
          <button onClick={() => setSelectedGame('pattern')} className="bg-yellow-400 text-white px-6 py-4 text-xl rounded-xl shadow-lg hover:bg-yellow-500 transition">
            🔷 Pattern Completion Game
          </button>
        </div>
      )}

      {/* Addition Game */}
      {selectedGame === 'addition' && (
        <div className="bg-white p-6 shadow-xl rounded-2xl w-3/4 max-w-lg text-center border-8 border-blue-300 animate-float">
          
          {/* Back Button */}
          <button 
            onClick={() => setSelectedGame(null)}
            className="mb-4 px-4 py-2 bg-blue-600 text-white rounded-full shadow hover:bg-blue-700 transition"
          >
            🔙 Back to Games
          </button>

          {/* Question */}
          <h2 className="text-3xl font-bold text-gray-800 border-dashed border-4 border-purple-400 p-4 rounded-lg inline-block">
            🧮 What is 2 + 2?
          </h2>

          {/* Answers */}
          <div className="grid grid-cols-2 gap-6 mt-6">
            {[3, 4, 5, 6].map((num) => (
              <button
                key={num}
                onClick={() => handleAnswerClick(num)}
                className="bg-purple-500 text-white py-3 px-6 rounded-full text-2xl shadow-md hover:bg-purple-600 transform active:scale-95 transition-all"
              >
                {num}
              </button>
            ))}
          </div>

          {/* Timer & Score */}
          <div className="flex justify-between items-center text-gray-800 mt-6">
            <div className="flex items-center space-x-2">
              <span className="text-lg font-bold">⏳ Time Left:</span>
              <div className="w-32 bg-gray-300 h-5 rounded-full overflow-hidden border border-gray-400">
                <div
                  className="bg-blue-500 h-5 rounded-full transition-all"
                  style={{ width: `${(timeLeft / 30) * 100}%` }}
                ></div>
              </div>
            </div>
            <p className="text-lg font-bold text-blue-600">✨ Score: <span className="text-blue-700">{score}</span></p>
          </div>

          {/* Encouragement */}
          <div className="mt-4">
            <p className="text-lg font-semibold text-purple-700 animate-bounce">You're doing great! 💪🎉</p>
          </div>
        </div>
      )}

      {/* Number Match Placeholder */}
      {selectedGame === 'numberMatch' && (
        <div className="bg-white p-6 shadow-xl rounded-2xl w-3/4 max-w-lg text-center border-8 border-pink-300 animate-float">
          <button 
            onClick={() => setSelectedGame(null)}
            className="mb-4 px-4 py-2 bg-pink-600 text-white rounded-full shadow hover:bg-pink-700 transition"
          >
            🔙 Back to Games
          </button>

          <h2 className="text-3xl font-bold text-pink-700">🍎 Number Match Game (Coming Next)</h2>
          <p className="text-lg mt-4">We’ll build this next! Stay tuned 😄</p>
        </div>
      )}

      {/* Pattern Completion Placeholder */}
      {selectedGame === 'pattern' && (
        <div className="bg-white p-6 shadow-xl rounded-2xl w-3/4 max-w-lg text-center border-8 border-yellow-300 animate-float">
          <button 
            onClick={() => setSelectedGame(null)}
            className="mb-4 px-4 py-2 bg-yellow-600 text-white rounded-full shadow hover:bg-yellow-700 transition"
          >
            🔙 Back to Games
          </button>

          <h2 className="text-3xl font-bold text-yellow-700">🔷 Pattern Completion Game (Coming Next)</h2>
          <p className="text-lg mt-4">We’ll build this one too! 😎</p>
        </div>
      )}

      {/* Break Section */}
      <div
        className="mt-12 p-8 text-center rounded-xl w-3/4 mx-auto border-4 border-yellow-300 shadow-lg relative bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/break-time.jpg')" }}
      >
        <div className="absolute inset-0 bg-white/85 rounded-2xl"></div>
        <div className="relative z-10">
          <h2 className="text-2xl font-bold text-yellow-800">💛 Need a Break?</h2>
          <p className="text-lg text-gray-800 mt-2">Feeling tired? Watch a fun video to refresh! 🎥</p>
          <button
            onClick={playRandomVideo}
            className="mt-4 px-6 py-3 bg-yellow-400 text-white text-xl font-bold rounded-full shadow-md hover:bg-yellow-500 transition-transform transform hover:scale-110"
          >
            ▶️ Play Video
          </button>
        </div>
      </div>
    </div>
  );
}
