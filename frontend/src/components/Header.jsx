import { Link } from 'react-router-dom';

export function Header() {
  return (
    <header className="bg-blue-400 text-white p-4 flex items-center justify-between shadow-lg">
      {/* Logo on the left */}
      <div className="flex items-center">
        <img 
          src="/Logo.png" 
          alt="AutiSmart Learning Logo" 
          className="h-20 w-20 rounded-full object-cover mr-4 shadow-lg border-4 border-white" 
        />
      </div>

      {/* Navigation Links on the right */}
      <nav className="flex space-x-4">
        <Link to="/" className="px-4 py-2 bg-blue-500 text-white rounded-full shadow-md hover:bg-blue-600 transition">Home</Link>
        <Link to="/game" className="px-4 py-2 bg-blue-500 text-white rounded-full shadow-md hover:bg-blue-600 transition">Game</Link>
        <Link to="/profile" className="px-4 py-2 bg-blue-500 text-white rounded-full shadow-md hover:bg-blue-600 transition">Profile</Link>
        <Link to="/progress" className="px-4 py-2 bg-blue-500 text-white rounded-full shadow-md hover:bg-blue-600 transition">Progress</Link>
        <Link to="/play-video" className="px-4 py-2 bg-blue-500 text-white rounded-full shadow-md hover:bg-blue-600 transition">Play Video</Link> {/* ✅ Added Play Video */}
        <Link to="/contact" className="px-4 py-2 bg-blue-500 text-white rounded-full shadow-md hover:bg-blue-600 transition">Contact Us</Link>
        <Link to="/signin" className="px-4 py-2 bg-blue-500 text-white rounded-full shadow-md hover:bg-blue-600 transition">Sign In</Link>
        <Link to="/signup" className="px-4 py-2 bg-blue-500 text-white rounded-full shadow-md hover:bg-blue-600 transition">Sign Up</Link>
        <Link to="/logout" className="px-4 py-2 bg-red-400 text-white rounded-full shadow-md hover:bg-red-500 transition">Logout</Link>
      </nav>
    </header>
  );
}
