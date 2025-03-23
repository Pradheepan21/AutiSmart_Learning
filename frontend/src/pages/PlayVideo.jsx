import { useLocation, useNavigate } from 'react-router-dom';

export function PlayVideo() {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const videoUrl = queryParams.get('videoUrl');

  return (
    <div className="bg-black min-h-screen flex flex-col items-center justify-center p-8">
      <h1 className="text-3xl font-bold text-white mb-6">🎬 Now Playing</h1>

      {/* Check if videoUrl exists before rendering */}
      {videoUrl ? (
        <iframe
          width="900"
          height="500"
          src={decodeURIComponent(videoUrl)} // Fix: Decode URL if encoded
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="rounded-lg shadow-lg"
        ></iframe>
      ) : (
        <p className="text-white text-lg">⚠️ No video available.</p>
      )}

      <button
        onClick={() => navigate(-1)}
        className="mt-6 px-6 py-3 bg-red-500 text-white font-bold rounded-full shadow-md hover:bg-red-600 transition-transform transform hover:scale-105"
      >
        🔙 Back
      </button>
    </div>
  );
}
