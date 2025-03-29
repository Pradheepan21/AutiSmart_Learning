import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export function NumberMatchGame({ onBack, updateScore }) {
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(5);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [question, setQuestion] = useState('');
  const [correctAnswer, setCorrectAnswer] = useState(0);
  const [options, setOptions] = useState([]);
  const [timeLeft, setTimeLeft] = useState(30);
  const [gameOver, setGameOver] = useState(false);
  const totalQuestions = 20;

  useEffect(() => {
    generateQuestion();
    const timer = setInterval(() => {
      setTimeLeft(prev => prev > 0 ? prev - 1 : 0);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (timeLeft === 0) {
      toast.warning("⏳ Time's up!");
      handleAnswer(-1);
    }
  }, [timeLeft]);

  const generateQuestion = () => {
    const num1 = Math.floor(Math.random() * 10) + 1;
    const num2 = Math.floor(Math.random() * 10) + 1;
    const isAddition = Math.random() > 0.5;
    
    const newQuestion = isAddition 
      ? `${num1} + ${num2}`
      : `${num1 + num2} - ${num2}`;
    
    const answer = isAddition ? num1 + num2 : num1;
    
    setQuestion(newQuestion);
    setCorrectAnswer(answer);

    const options = [answer];
    while (options.length < 4) {
      const randomOption = Math.floor(Math.random() * 20) + 1;
      if (!options.includes(randomOption)) {
        options.push(randomOption);
      }
    }
    setOptions(options.sort(() => Math.random() - 0.5));
  };

  const handleAnswer = (selectedAnswer) => {
    if (gameOver) return;

    if (selectedAnswer === correctAnswer) {
      toast.success("✅ Correct!");
      const newScore = score + 1;
      setScore(newScore);
      updateScore(newScore);
    } else {
      toast.error("❌ Wrong!");
      const newLives = lives - 1;
      setLives(newLives);
      if (newLives === 0) {
        handleGameOver();
        return;
      }
    }

    if (currentQuestion < totalQuestions - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setTimeLeft(30);
      generateQuestion();
    } else {
      handleGameOver();
    }
  };

  const handleGameOver = async () => {
    setGameOver(true);
    toast.info("🎮 Game Over! Saving score...");
    const user = JSON.parse(localStorage.getItem("user"));
    const token = localStorage.getItem("token");

    if (!user || !token) {
      toast.error("User not authenticated. Score not saved.");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/games/number-match", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ userId: user.id, score }),
      });

      const data = await response.json();
      if (response.ok) {
        toast.success("🎉 Score saved successfully!");
      } else {
        toast.error(data.message || "Failed to save score.");
      }
    } catch (err) {
      toast.error("Failed to connect to server.");
    }
  };

  return (
    <div className="bg-white p-6 shadow-xl rounded-2xl w-3/4 max-w-lg text-center border-8 border-pink-300 animate-float">
      <button 
        onClick={onBack}
        className="mb-4 px-4 py-2 bg-pink-600 text-white rounded-full shadow hover:bg-pink-700 transition"
      >
        🔙 Back to Games
      </button>

      <h2 className="text-3xl font-bold text-pink-700">🍎 Number Match Game</h2>

      {!gameOver ? (
        <>
          <div className="my-6">
            <p className="text-xl">Question {currentQuestion + 1}/{totalQuestions}</p>
            <h3 className="text-4xl font-bold my-4">{question} = ?</h3>
            <div className="grid grid-cols-2 gap-4 mt-4">
              {options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswer(option)}
                  className="bg-pink-400 text-white py-3 px-6 rounded-full text-xl shadow-md hover:bg-pink-500 transition"
                >
                  {option}
                </button>
              ))}
            </div>
          </div>

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
        </>
      ) : (
        <div className="mt-6">
          <h3 className="text-2xl text-pink-700 font-bold">Game Over!</h3>
          <p className="text-lg mt-2">Your score: <span className="font-bold">{score}</span></p>
        </div>
      )}
      
    </div>
  );
}
