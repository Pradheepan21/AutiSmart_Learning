import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip);

function GameProgressCard({ title, icon, entries }) {
  const latest = entries[entries.length - 1];
  const recentEntries = entries.slice(-5);

  const chartData = {
    labels: recentEntries.map(e => new Date(e.date).toLocaleDateString()),
    datasets: [
      {
        label: 'Score',
        data: recentEntries.map(e => e.score),
        fill: true,
        borderColor: '#2563eb',
        backgroundColor: 'rgba(37, 99, 235, 0.1)',
        tension: 0.4,
      },
    ],
  };

  return (
    <div className="bg-gradient-to-br from-white to-blue-50 p-6 rounded-3xl shadow-xl border border-blue-200 hover:shadow-2xl transition-all duration-300 w-full">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl sm:text-2xl font-bold text-blue-800 flex items-center gap-2">{icon} {title}</h2>
        {latest && (
          <div className="text-right">
            <p className="text-sm text-gray-700 font-semibold">Latest Score</p>
            <p className="text-lg text-blue-700">{latest.score} ⭐</p>
            <p className="text-xs text-gray-400">{new Date(latest.date).toLocaleDateString()}</p>
          </div>
        )}
      </div>
      {latest ? (
        <div className="h-48">
          <Line data={chartData} options={{ maintainAspectRatio: false }} />
        </div>
      ) : (
        <p className="text-center text-gray-400 italic">No records yet. Play this game to start tracking progress!</p>
      )}
    </div>
  );
}

function BadgeSection({ badges }) {
  const allBadges = [
    { name: 'Bronze Star', icon: '🥉' },
    { name: 'Silver Star', icon: '🥈' },
    { name: 'Game Explorer', icon: '🏅' },
    { name: 'Fast Learner', icon: '🚀' },
    { name: 'Brain Builder', icon: '🧠' },
  ];

  return (
    <div className="bg-gradient-to-br from-white to-green-50 p-8 rounded-3xl shadow-xl border border-green-300 mt-12">
      <h2 className="text-3xl font-bold text-green-800 text-center mb-6">🌟 Achievement Badges</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
        {allBadges.map(badge => (
          <div
            key={badge.name}
            className={`p-5 rounded-2xl text-center font-semibold text-md transition-all duration-300 shadow-lg border-2 ${
              badges.includes(badge.name)
                ? 'bg-green-100 text-green-700 border-green-400'
                : 'bg-gray-100 text-gray-400 border-gray-300 opacity-70'
            } hover:scale-105`}
          >
            <div className="text-4xl mb-2">{badge.icon}</div>
            <div>{badge.name}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function Progress() {
  const navigate = useNavigate();
  const [progress, setProgress] = useState({
    numberMatch: [],
    visualAddition: [],
    pattern: [],
    badges: [],
  });

  useEffect(() => {
    const fetchProgress = async () => {
      const user = JSON.parse(localStorage.getItem("user"));
      const token = localStorage.getItem("token");
      if (!user || !token) return;

      try {
        const res = await fetch(`http://localhost:5000/api/progress/${user.id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        setProgress(data);
      } catch (err) {
        console.error("❌ Failed to fetch progress:", err);
      }
    };
    fetchProgress();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-tr from-yellow-50 via-yellow-100 to-yellow-200 py-10 px-4">
      <div className="max-w-7xl mx-auto space-y-12">
        <div className="text-center bg-white rounded-3xl shadow-2xl py-8 px-6 border-4 border-yellow-400">
          <h1 className="text-5xl font-extrabold text-yellow-800 animate-bounce mb-3">📈 Progress Dashboard</h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">Monitor progress across games and motivate learners with fun rewards and insightful visuals!</p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          <GameProgressCard title="Number Match Game" icon="🍎" entries={progress.numberMatch} />
          <GameProgressCard title="Visual Addition Game" icon="➕" entries={progress.visualAddition} />
          <GameProgressCard title="Pattern Completion Game" icon="🔷" entries={progress.pattern} />
        </div>

        <BadgeSection badges={progress.badges} />

        <div className="flex justify-center">
          <button
            onClick={() => navigate('/profile')}
            className="mt-4 px-10 py-3 bg-blue-600 text-white text-lg font-bold rounded-full shadow-md hover:bg-blue-700 transition-transform hover:scale-105"
          >
            🔙 Back to Profile
          </button>
        </div>
      </div>
    </div>
  );
}