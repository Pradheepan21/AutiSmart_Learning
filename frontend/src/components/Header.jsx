import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';

export function Header() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Check auth on route change
  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");

    try {
      const parsedUser = JSON.parse(user);
      const isValid = !!token && parsedUser && parsedUser.id;
      setIsAuthenticated(isValid);
    } catch (error) {
      setIsAuthenticated(false);
    }
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsAuthenticated(false);
    setMenuOpen(false);
    navigate("/signin");
  };

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <header className="bg-blue-500 text-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto flex items-center justify-between px-4 py-3">


        <Link to="/" className="nav-link" onClick={closeMenu}>
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <img
              src="/Logo.png"
              alt="AutiSmart Logo"
              className="h-12 w-12 rounded-full border-2 border-white shadow"
            />
            <span className="text-xl font-bold hidden sm:inline-block">AutiSmart</span>
          </div>
        </Link>
        {/* Hamburger Icon for Mobile */}
        <div className="md:hidden">
          <button onClick={toggleMenu} className="focus:outline-none">
            {menuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>

        {/* Menu Items */}
        <nav className={`absolute md:static top-16 left-0 w-full md:w-auto bg-blue-500 md:bg-transparent shadow-md md:shadow-none flex flex-col md:flex-row items-start md:items-center px-4 md:px-0 py-2 md:py-0 space-y-2 md:space-y-0 md:space-x-4 transition-all duration-300 ease-in-out ${menuOpen ? 'block' : 'hidden md:flex'}`}>
         

          {isAuthenticated ? (
            <>
              <Link to="/game" className="nav-link" onClick={closeMenu}>Game</Link>
              <Link to="/profile" className="nav-link" onClick={closeMenu}>Profile</Link>
              <Link to="/progress" className="nav-link" onClick={closeMenu}>Progress</Link>
              <Link to="/contact" className="nav-link" onClick={closeMenu}>Contact Us</Link>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-400 rounded-full hover:bg-red-500 transition w-full md:w-auto text-left md:text-center"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/signin" className="nav-link" onClick={closeMenu}>Sign In</Link>
              <Link to="/signup" className="nav-link" onClick={closeMenu}>Sign Up</Link>
            </>
          )}
        </nav>
      </div>

      {/* Styles for nav links */}
      <style jsx>{`
        .nav-link {
          @apply px-4 py-2 rounded-full bg-blue-400 hover:bg-blue-600 transition w-full md:w-auto text-left md:text-center;
        }
      `}</style>
    </header>
  );
}
