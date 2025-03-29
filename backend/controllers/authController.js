const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// ✅ Generate JWT Token
const generateToken = (res, userId) => {
  const token = jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE || '30d',
  });

  res.cookie('token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
  });

  return token;
};

// ✅ User Login
exports.loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  console.log("🟡 Login request received for:", email);

  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    console.log("🔴 Email not found");
    return res.status(401).json({ success: false, message: "Invalid email or password" });
  }

  const isMatch = await user.matchPassword(password);
  if (!isMatch) {
    console.log("🔴 Password mismatch");
    return res.status(401).json({ success: false, message: "Invalid email or password" });
  }

  console.log("🟢 Login successful for:", user.email);

  const token = generateToken(res, user._id);

  return res.status(200).json({
    success: true,
    message: "Login successful",
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
    },
  });
});

// ✅ User Registration
exports.registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const userExists = await User.findOne({ email });
  if (userExists) {
    return res.status(400).json({
      success: false,
      message: 'User already exists',
    });
  }

  // ❌ REMOVE manual hashing here
  const user = await User.create({ name, email, password });

  const token = generateToken(res, user._id);

  res.status(201).json({
    success: true,
    message: "Registration successful",
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
    },
  });
});

// ✅ User Logout
exports.logoutUser = asyncHandler(async (req, res) => {
  res.clearCookie('token', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
  });

  res.status(200).json({
    success: true,
    message: "Logged out successfully",
  });
});

// ✅ Token Verifier
exports.verifyToken = asyncHandler(async (req, res) => {
  res.status(200).json({
    success: true,
    message: "Token is valid",
    user: req.user,
  });
});
