import { useState, useEffect } from 'react';

const colors = ['bg-red-500', 'bg-blue-500', 'bg-green-500', 'bg-yellow-500'];

export function PatternGame({ onBack, updateScore }) {
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(5);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [pattern, setPattern] = useState([]);
  const [correctAnswer, setCorrectAnswer] = useState('');
  const [options, setOptions] = useState([]);
  const [timeLeft, setTimeLeft] = useState(30);
  const [gameOver, setGameOver] = useState(false);
  const totalQuestions = 20;

  useEffect(() => {
    if (!gameOver) {
      generateQuestion();
      const timer = setInterval(() => {
        setTimeLeft(prev => prev > 0 ? prev - 1 : 0);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [currentQuestion, gameOver]);

  useEffect(() => {
    if (timeLeft === 0 && !gameOver) {
      handleWrongAnswer();
    }
  }, [timeLeft, gameOver]);

  const generatePattern = () => {
    const patternLength = 4; // Fixed pattern length for simplicity
    const firstColor = colors[Math.floor(Math.random() * colors.length)];
    const secondColor = colors[Math.floor(Math.random() * colors.length)];
    
    // Create a simple alternating pattern
    const newPattern = [];
    for (let i = 0; i < patternLength; i++) {
      newPattern.push(i % 2 === 0 ? firstColor : secondColor);
    }
    
    return newPattern;
  };

  const generateQuestion = () => {
    const fullPattern = generatePattern();
    const visiblePattern = fullPattern.slice(0, -1);
    const answer = fullPattern[fullPattern.length - 1];
    
    setPattern(visiblePattern);
    setCorrectAnswer(answer);
    
    // Generate options - ensure answer is included and options are unique
    const options = [answer];
    while (options.length < 4) {
      const randomColor = colors[Math.floor(Math.random() * colors.length)];
      if (!options.includes(randomColor)) {
        options.push(randomColor);
      }
    }
    setOptions(options.sort(() => Math.random() - 0.5));
  };

  const handleWrongAnswer = () => {
    const newLives = lives - 1;
    setLives(newLives);
    if (newLives === 0) {
      setGameOver(true);
      return;
    }
    
    if (currentQuestion < totalQuestions - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setTimeLeft(30);
      generateQuestion();
    }
  };

  const handleAnswer = (selectedAnswer) => {
    if (gameOver) return;
    
    if (selectedAnswer === correctAnswer) {
      setScore(score + 1);
      updateScore(score + 1);
      
      if (currentQuestion < totalQuestions - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setTimeLeft(30);
        generateQuestion();
      } else {
        setGameOver(true);
      }
    } else {
      handleWrongAnswer();
    }
  };

  return (
    <div className="bg-white p-6 shadow-xl rounded-2xl w-3/4 max-w-lg text-center border-8 border-yellow-300 animate-float">
      <button 
        onClick={onBack}
        className="mb-4 px-4 py-2 bg-yellow-600 text-white rounded-full shadow hover:bg-yellow-700 transition"
      >
        🔙 Back to Games
      </button>

      <h2 className="text-3xl font-bold text-yellow-700">🔷 Pattern Completion Game</h2>
      
      {gameOver ? (
        <div className="my-6">
          <h3 className="text-2xl font-bold text-red-500">Game Over!</h3>
          <p className="text-xl">Your final score: {score}/{totalQuestions}</p>
          <button
            onClick={() => {
              setScore(0);
              setLives(5);
              setCurrentQuestion(0);
              setGameOver(false);
              setTimeLeft(30);
              generateQuestion();
            }}
            className="mt-4 px-6 py-2 bg-yellow-500 text-white rounded-lg shadow hover:bg-yellow-600 transition"
          >
            Play Again
          </button>
        </div>
      ) : (
        <div className="my-6">
          <p className="text-xl">Question {currentQuestion + 1}/{totalQuestions}</p>
          <div className="flex justify-center my-4 gap-2">
            {pattern.map((color, index) => (
              <div 
                key={index} 
                className={`w-8 h-8 rounded-full ${color} border border-gray-400`}
              ></div>
            ))}
            <div className="w-8 h-8 rounded-full border-2 border-dashed border-gray-500 flex items-center justify-center">
              <span className="text-gray-500">?</span>
            </div>
          </div>
          <p className="text-xl my-2">What color comes next?</p>
          <div className="grid grid-cols-2 gap-4 mt-4">
            {options.map((color, index) => (
              <button
                key={index}
                onClick={() => handleAnswer(color)}
                className="flex items-center justify-center gap-2 bg-yellow-400 text-white py-3 px-6 rounded-full text-xl shadow-md hover:bg-yellow-500 transition"
              >
                <div className={`w-6 h-6 rounded-full ${color} border border-gray-400`}></div>
                <span>Option {index + 1}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="flex justify-between items-center mt-4">
        <div className="text-lg">
          <span className="font-bold">❤️ Lives:</span> {lives}
        </div>
        <div className="text-lg">
          <span className="font-bold">✨ Score:</span> {score}
        </div>
        <div className="text-lg">
          <span className="font-bold">⏳ Time:</span> {timeLeft}s
        </div>
      </div>
    </div>
  );
}