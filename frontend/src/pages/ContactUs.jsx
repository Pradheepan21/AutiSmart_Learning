import { useState } from 'react';
import { notification } from 'antd';

export function ContactUs() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/api/contact/send", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error('Failed to send message');

      notification.success({
        message: 'Success!',
        description: 'Your message has been sent! 🎉',
      });
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      console.error("❌ Contact form error:", error);
      notification.error({
        message: 'Oops!',
        description: 'Something went wrong. Please try again.',
      });
    }
  };

  return (
    <div 
      className="min-h-screen flex items-center justify-center p-20 relative"
      style={{ 
        backgroundImage: "url('/contact-bg.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed"
      }}
    >
      <div className="absolute inset-0 bg-white/20"></div>

      <div className="relative z-10 bg-gradient-to-b from-blue-200 to-blue-300 p-10 rounded-3xl shadow-2xl border-8 border-white w-full max-w-lg text-center ml-16">
        <h1 className="text-4xl font-bold text-blue-900 animate-bounce">📩 Contact Us</h1>
        <p className="text-lg text-blue-800 mt-2 font-semibold">We'd love to hear from you! 💌</p>

        <form onSubmit={onSubmit} className="space-y-6 mt-6">
          <div className="text-left">
            <label className="text-lg font-bold text-blue-800">👤 Name</label>
            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-3 border-2 border-blue-400 rounded-xl bg-white shadow-md focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="text-left">
            <label className="text-lg font-bold text-blue-800">📧 Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-3 border-2 border-blue-400 rounded-xl bg-white shadow-md focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="text-left">
            <label className="text-lg font-bold text-blue-800">💬 Message</label>
            <textarea
              name="message"
              placeholder="Enter your message"
              value={formData.message}
              onChange={handleChange}
              className="w-full p-3 border-2 border-blue-400 rounded-xl bg-white shadow-md focus:ring-2 focus:ring-blue-500 h-32"
              required
            ></textarea>
          </div>

          <button 
            type="submit" 
            className="bg-blue-800 text-white px-6 py-3 rounded-xl text-xl font-bold shadow-md hover:bg-blue-600 transition-transform transform hover:scale-105"
          >
            📤 Submit
          </button>
        </form>
      </div>
    </div>
  );
}
