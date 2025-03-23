import { useState } from "react";
import { notification } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { FaUser, FaLock, FaEnvelope } from "react-icons/fa";

export function SignUp() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch("http://localhost:5000/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      setLoading(false);

      if (response.ok) {
        notification.success({ message: "Success", description: "Account created successfully!" });
        navigate("/signin"); // Redirect to Sign In page
      } else {
        notification.error({ message: "Sign Up Failed", description: data.error || "Something went wrong" });
      }
    } catch (error) {
      setLoading(false);
      notification.error({ message: "Error", description: "Server error, please try again later." });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-8 bg-gradient-to-br from-purple-200 to-blue-100">
      
      {/* Sign-Up Container (Two-Column Layout) */}
      <div className="flex bg-white rounded-3xl shadow-2xl border-8 border-purple-400 overflow-hidden w-full max-w-4xl">
        
        {/* Left Side - Sign-Up Form */}
        <div className="w-full md:w-1/2 p-10 text-center bg-gradient-to-b from-purple-200 to-blue-200">
          
          {/* Title */}
          <h1 className="text-4xl font-bold text-purple-900 animate-bounce">🎉 Join Us!</h1>
          <p className="text-lg font-semibold text-purple-800">Create an account and start learning! 🚀</p>

          {/* Form */}
          <form onSubmit={onSubmit} className="space-y-6 mt-6">
            <div className="flex items-center border-2 border-purple-400 rounded-full p-3 bg-white shadow-md">
              <FaUser className="text-purple-600 mr-3 text-xl" />
              <input
                type="text"
                name="name"
                placeholder="Enter your name"
                value={formData.name}
                onChange={handleChange}
                className="bg-transparent outline-none w-full text-purple-900 placeholder-purple-500"
                required
              />
            </div>

            <div className="flex items-center border-2 border-purple-400 rounded-full p-3 bg-white shadow-md">
              <FaEnvelope className="text-purple-600 mr-3 text-xl" />
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                className="bg-transparent outline-none w-full text-purple-900 placeholder-purple-500"
                required
              />
            </div>

            <div className="flex items-center border-2 border-purple-400 rounded-full p-3 bg-white shadow-md">
              <FaLock className="text-purple-600 mr-3 text-xl" />
              <input
                type="password"
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                className="bg-transparent outline-none w-full text-purple-900 placeholder-purple-500"
                required
              />
            </div>

            {/* Submit Button */}
            <button 
              type="submit" 
              className="w-full bg-purple-400 text-white font-bold py-3 rounded-full text-xl shadow-md hover:bg-purple-500 transition-transform transform hover:scale-105 disabled:bg-purple-300"
              disabled={loading}
            >
              {loading ? "🚀 Creating Account..." : "🎈 Sign Up"}
            </button>
          </form>
          
          {/* Sign In Link */}
          <p className="text-lg mt-4 text-purple-900">
            Already have an account? <Link to="/signin" className="font-bold text-purple-900">Sign In Here! 🔑</Link>
          </p>
        </div>

        {/* Right Side - Image Fully Fitted */}
        <div className="w-1/2 hidden md:flex">
          <img 
            src="/signup-right.jpg" 
            alt="Sign Up" 
            className="w-full h-full object-cover"
          />
        </div>

      </div>
    </div>
  );
}
