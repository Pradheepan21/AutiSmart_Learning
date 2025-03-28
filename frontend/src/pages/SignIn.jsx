import { useState, useContext } from "react";
import { notification } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { FaUser, FaLock } from "react-icons/fa";
import { AuthContext } from "../utils/AuthContext";

export function SignIn() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { handleLogin } = useContext(AuthContext); // ✅ Use context

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const result = await handleLogin({
      email: formData.email,
      password: formData.password,
    });

    setLoading(false);

    if (result.success) {
      notification.success({
        message: "Login Successful 🎉",
        description: "Welcome back to Autismart!",
      });
      navigate("/game"); // ✅ Redirect to protected route
    } else {
      notification.error({
        message: "Login Failed",
        description: result.message || "Invalid credentials",
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-8 bg-gradient-to-br from-blue-200 to-yellow-100">
      <div className="flex bg-white rounded-3xl shadow-2xl border-8 border-blue-400 overflow-hidden w-full max-w-4xl">
        {/* Left Side */}
        <div className="w-1/2 hidden md:flex">
          <img 
            src="/signin-left.jpeg" 
            alt="Sign In" 
            className="w-full h-full object-cover"
          />
        </div>

        {/* Right Side - Form */}
        <div className="w-full md:w-1/2 p-10 text-center bg-gradient-to-b from-blue-200 to-yellow-200">
          <h1 className="text-4xl font-bold text-blue-900 animate-bounce">🎓 Welcome Back!</h1>
          <p className="text-lg font-semibold text-blue-800">Sign in and continue your learning adventure! 🌟</p>

          <form onSubmit={onSubmit} className="space-y-6 mt-6">
            <div className="flex items-center border-2 border-blue-400 rounded-full p-3 bg-white shadow-md">
              <FaUser className="text-blue-600 mr-3 text-xl" />
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                className="bg-transparent outline-none w-full text-blue-900 placeholder-blue-500"
                required
              />
            </div>

            <div className="flex items-center border-2 border-blue-400 rounded-full p-3 bg-white shadow-md">
              <FaLock className="text-blue-600 mr-3 text-xl" />
              <input
                type="password"
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                className="bg-transparent outline-none w-full text-blue-900 placeholder-blue-500"
                required
              />
            </div>

            <button 
              type="submit" 
              className="w-full bg-blue-400 text-white font-bold py-3 rounded-full text-xl shadow-md hover:bg-blue-500 transition-transform transform hover:scale-105 disabled:bg-blue-300"
              disabled={loading}
            >
              {loading ? "🚀 Signing In..." : "🔑 Sign In"}
            </button>
          </form>
          
          <p className="text-lg mt-4 text-blue-900">
            Don't have an account? <Link to="/signup" className="font-bold text-blue-900">Create one here! 🚀</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
