import { useState, useEffect } from 'react';

export function NumberMatchGame({ onBack, updateScore }) {
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(5);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [question, setQuestion] = useState('');
  const [correctAnswer, setCorrectAnswer] = useState(0);
  const [options, setOptions] = useState([]);
  const [timeLeft, setTimeLeft] = useState(30);
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
      handleAnswer(-1); // Time's up counts as wrong answer
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
    
    // Generate options
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
    if (selectedAnswer === correctAnswer) {
      setScore(score + 1);
      updateScore(score + 1);
    } else {
      setLives(lives - 1);
      if (lives - 1 === 0) {
        // Game over
        return;
      }
    }
    
    if (currentQuestion < totalQuestions - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setTimeLeft(30);
      generateQuestion();
    } else {
      // Game completed
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
    </div>
  );
}