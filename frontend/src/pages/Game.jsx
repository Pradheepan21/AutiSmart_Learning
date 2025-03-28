import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { NumberMatchGame } from '../components/NumberMatchGame';
import { VisualAdditionGame } from '../components/VisualAdditionGame';
import { PatternGame } from '../components/PatternGame';

export function Game() {
  const navigate = useNavigate();
  const [selectedGame, setSelectedGame] = useState(null);
  const [totalScore, setTotalScore] = useState(0);

  const playRandomVideo = () => {
    navigate('/play-video');
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

      {/* Game Components */}
      {selectedGame === 'numberMatch' && (
        <NumberMatchGame 
          onBack={() => setSelectedGame(null)} 
          updateScore={(score) => setTotalScore(score)}
        />
      )}
      {selectedGame === 'addition' && (
        <VisualAdditionGame 
          onBack={() => setSelectedGame(null)} 
          updateScore={(score) => setTotalScore(score)}
        />
      )}
      {selectedGame === 'pattern' && (
        <PatternGame 
          onBack={() => setSelectedGame(null)} 
          updateScore={(score) => setTotalScore(score)}
        />
      )}

      {/* Break Section */}
      <div className="mt-12 p-8 text-center rounded-xl w-3/4 mx-auto border-4 border-yellow-300 shadow-lg relative bg-cover bg-center bg-no-repeat">
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