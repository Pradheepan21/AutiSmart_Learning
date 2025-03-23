const express = require("express");
const { registerUser, loginUser } = require("../controllers/authController");

const router = express.Router();

// User Signup Route
router.post("/signup", registerUser);

// User Signin Route
router.post("/signin", loginUser);

module.exports = router;
