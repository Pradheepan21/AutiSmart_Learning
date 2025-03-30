// server.js

const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const gameRoutes = require("./routes/gameRoutes");
const userRoutes = require("./routes/userRouter");
const profileRoutes = require("./routes/profileRoutes");
const contactRoutes = require("./routes/contactRoutes"); // ✅ New

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// CORS fix
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5174",
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
}));

app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/games", gameRoutes);  
app.use("/api/users", userRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/contact", contactRoutes); // ✅ Added

// Health check
app.get("/api/health", (req, res) => {
  res.status(200).json({ status: "Server is running 🚀" });
});

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log("✅ MongoDB connected");
  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
  });
})
.catch((err) => {
  console.error("❌ MongoDB connection error:", err);
});
