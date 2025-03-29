import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { SignUp } from "./pages/SignUp";
import { SignIn } from "./pages/SignIn";
import { Game } from "./pages/Game";
import { Profile } from "./pages/Profile";
import { Progress } from "./pages/Progress";
import { PlayVideo } from "./pages/PlayVideo";
import { ContactUs } from "./pages/ContactUs";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import ProtectedRoute from "./utils/ProtectedRoute";
import { Logout } from "./components/Logout"; 

import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

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
            
            {/* Protected Routes */}
            <Route path="/game" element={
              <ProtectedRoute>
                <Game />
              </ProtectedRoute>
            } />
            <Route path="/profile" element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            } />
            <Route path="/progress" element={
              <ProtectedRoute>
                <Progress />
              </ProtectedRoute>
            } />
            <Route path="/contact" element={
              <ProtectedRoute>
                <ContactUs />
              </ProtectedRoute>
            } />
            <Route path="/play-video" element={
              <ProtectedRoute>
                <PlayVideo />
              </ProtectedRoute>
            } />
            
            <Route path="/logout" element={<Logout />} /> 
          </Routes>
        </div>
        <Footer />
      </div>

      <ToastContainer position="top-center" autoClose={2000} />
    </Router>
  );
}
