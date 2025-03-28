import { useState, useEffect } from 'react';

const colors = ['bg-red-500', 'bg-blue-500', 'bg-green-500', 'bg-yellow-500'];

export function VisualAdditionGame({ onBack, updateScore }) {
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(5);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [items, setItems] = useState([]);
  const [correctAnswer, setCorrectAnswer] = useState(0);
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

  const generateQuestion = () => {
    const count1 = Math.floor(Math.random() * 5) + 1;
    const count2 = Math.floor(Math.random() * 5) + 1;
    const selectedColor = colors[Math.floor(Math.random() * colors.length)];
    
    const newItems = [
      ...Array(count1 + count2).fill(selectedColor)
    ];
    
    setItems(newItems);
    const answer = count1 + count2;
    setCorrectAnswer(answer);
    
    // Generate options
    const options = [answer];
    while (options.length < 4) {
      const randomOption = Math.floor(Math.random() * 10) + 1;
      if (!options.includes(randomOption) && randomOption !== answer) {
        options.push(randomOption);
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
    <div className="bg-white p-6 shadow-xl rounded-2xl w-3/4 max-w-lg text-center border-8 border-green-300 animate-float">
      <button 
        onClick={onBack}
        className="mb-4 px-4 py-2 bg-green-600 text-white rounded-full shadow hover:bg-green-700 transition"
      >
        🔙 Back to Games
      </button>

      <h2 className="text-3xl font-bold text-green-700">➕ Visual Addition Game</h2>
      
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
            className="mt-4 px-6 py-2 bg-green-500 text-white rounded-lg shadow hover:bg-green-600 transition"
          >
            Play Again
          </button>
        </div>
      ) : (
        <div className="my-6">
          <p className="text-xl">Question {currentQuestion + 1}/{totalQuestions}</p>
          <div className="flex justify-center flex-wrap my-4 min-h-20 gap-2">
            {items.map((color, index) => (
              <div 
                key={index} 
                className={`w-8 h-8 rounded-full ${items[0]} border border-gray-400`}
              ></div>
            ))}
          </div>
          <p className="text-xl my-2">How many circles are there?</p>
          <div className="grid grid-cols-2 gap-4 mt-4">
            {options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswer(option)}
                className="bg-green-400 text-white py-3 px-6 rounded-full text-xl shadow-md hover:bg-green-500 transition"
              >
                {option}
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