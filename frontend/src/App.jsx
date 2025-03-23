import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { SignUp } from "./pages/SignUp";
import { SignIn } from "./pages/SignIn";
import { Game } from "./pages/Game";
import { Profile } from "./pages/Profile";
import { Progress } from "./pages/Progress"; // ✅ Make sure this is imported
import { PlayVideo } from "./pages/PlayVideo"; // ✅ Import PlayVideo
import { ContactUs } from "./pages/ContactUs";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import Logout from "./components/Logout";

export default function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/game" element={<Game />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/progress" element={<Progress />} /> {/* ✅ Fixed Progress Route */}
            <Route path="/play-video" element={<PlayVideo />} /> {/* ✅ Fixed Play Video Route */}
            <Route path="/contact" element={<ContactUs />} />
            <Route path="/logout" element={<Logout />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}
