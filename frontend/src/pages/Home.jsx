import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export function Home() {
  const navigate = useNavigate();
  const [videoLinks, setVideoLinks] = useState([]);

  useEffect(() => {
    fetch("/video.json")
      .then((response) => response.json())
      .then((data) => setVideoLinks(Array.isArray(data) ? data : []))
      .catch((error) => console.error("Error loading videos:", error));
  }, []);

  const playRandomVideo = () => {
    if (videoLinks.length > 0) {
      const shuffledVideos = [...videoLinks].sort(() => Math.random() - 0.5);
      const selectedVideo = shuffledVideos[0]
        .replace("youtu.be/", "www.youtube.com/embed/")
        .replace("/shorts/", "/embed/");
      navigate(`/play-video?videoUrl=${encodeURIComponent(selectedVideo)}`);
    }
  };

  return (
    <div className="bg-gradient-to-b from-blue-200 to-white min-h-screen">
      
      {/* Welcome Section */}
      <div className="text-center p-8">
        <h1 className="text-4xl font-bold text-blue-700">🎉 Welcome to AutiSmart Learning! 🎉</h1>
        <p className="text-lg text-blue-500 mt-2 font-semibold">
          Fun Math Games | Mood Support | Track Progress
        </p>

        <button
          onClick={() => navigate("/game")}
          className="mt-4 px-8 py-3 bg-blue-400 text-white text-lg font-bold rounded-full shadow-lg hover:bg-blue-500 transition-transform transform hover:scale-105"
        >
          🚀 Start Learning Now
        </button>
      </div>

      {/* Feature Section */}
      <div className="flex justify-center mt-8 space-x-8">
        
        {/* Fun Math Games */}
        <div
          className="bg-blue-300 p-8 shadow-xl rounded-2xl w-[300px] h-80 text-center border-4 border-blue-400 bg-cover bg-center bg-no-repeat relative flex flex-col justify-between"
          style={{ backgroundImage: "url('/math-game.jpg')" }}
        >
          <div className="absolute inset-0 bg-white/70 rounded-2xl"></div>
          <div className="relative z-10 flex flex-col justify-center h-full">
            <h2 className="text-xl font-bold text-blue-800">🧮 Fun Math Games</h2>
            <p className="text-gray-700 font-semibold mt-2">Turn numbers into adventure! play interactive math challenges, and become a math wizard!</p>
            <button
              onClick={() => navigate("/game")}
              className="mt-auto px-5 py-2 bg-blue-400 text-white rounded-full shadow-md hover:bg-blue-500 transition-transform transform hover:scale-105"
            >
              🎮 Play Now
            </button>
          </div>
        </div>

        {/* Mood-Based Learning */}
        <div
          className="bg-blue-300 p-8 shadow-xl rounded-2xl w-[300px] h-80 text-center border-4 border-blue-400 bg-cover bg-center bg-no-repeat relative flex flex-col justify-between"
          style={{ backgroundImage: "url('/happy-kid.jpg')" }}
        >
          <div className="absolute inset-0 bg-white/80 rounded-2xl"></div>
          <div className="relative z-10 flex flex-col justify-center h-full">
            <h2 className="text-xl font-bold text-blue-800">😊 Mood-Based Learning</h2>
            <p className="text-gray-700 font-semibold mt-2">Feeling down? Enjoy cheerful videos and fun activities to brighten your day!</p>
            <button
              onClick={playRandomVideo}
              className="mt-auto px-5 py-2 bg-blue-400 text-white rounded-full shadow-md hover:bg-blue-500 transition-transform transform hover:scale-105"
            >
              🎥 Play Video
            </button>
          </div>
        </div>

        {/* Progress Tracking */}
        <div
          className="bg-blue-300 p-8 shadow-xl rounded-2xl w-[300px] h-80 text-center border-4 border-blue-400 bg-cover bg-center bg-no-repeat relative flex flex-col justify-between"
          style={{ backgroundImage: "url('/progress.jpg')" }}
        >
          <div className="absolute inset-0 bg-white/80 rounded-2xl"></div>
          <div className="relative z-10 flex flex-col justify-center h-full">
            <h2 className="text-xl font-bold text-blue-800">📊 Progress Tracking</h2>
            <p className="text-gray-700 font-semibold mt-2">Track your progress, earn rewards, and celebrate your achievements!</p>
            <button
              onClick={() => navigate("/profile")}
              className="mt-auto px-5 py-2 bg-blue-400 text-white rounded-full shadow-md hover:bg-blue-500 transition-transform transform hover:scale-105"
            >
              🔍 View Progress
            </button>
          </div>
        </div>
      </div>

      {/* Emotional Support Section */}
      <div className="mt-12 bg-gradient-to-b from-yellow-100 to-white p-12 text-center rounded-2xl shadow-md">
        <h2 className="text-2xl font-bold text-yellow-600">💛 We Care About How You Feel! 💛</h2>
        <p className="text-lg text-gray-800 italic mt-2">
          If you're sad, we'll play something happy to help you smile!!! 😊
        </p>
        <img
          src="happy-child.jpg"
          alt="Happy Child"
          className="mt-6 mx-auto w-48 rounded-full shadow-lg border-2 border-yellow-300"
        />
      </div>
    </div>
  );
}
