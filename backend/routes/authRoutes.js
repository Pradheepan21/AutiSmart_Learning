const express = require('express');
const { body, validationResult } = require('express-validator');
const {
  registerUser,
  loginUser,
  logoutUser,  // ✅ Added logout route
  verifyToken,
} = require('../controllers/authController');
const { protect } = require('../middleware/authmiddleware');

const router = express.Router();

// ✅ Validation Middleware
const validateRequest = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors: errors.array() });
  }
  next();
};

// ✅ Validation rules for register
const registerValidation = [
  body('name')
    .notEmpty().withMessage('Name is required')
    .isLength({ min: 2 }).withMessage('Name must be at least 2 characters'),
  body('email')
    .isEmail().withMessage('Please include a valid email'),
  body('password')
    .isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  validateRequest
];

// ✅ Validation rules for login
const loginValidation = [
  body('email').isEmail().withMessage('Please include a valid email'),
  body('password').exists().withMessage('Password is required'),
  validateRequest
];

// ✅ Auth routes
router.post('/signup', registerValidation, registerUser);
router.post('/signin', loginValidation, loginUser);
router.post('/logout', logoutUser);  // ✅ Now added!
router.get('/verify', protect, verifyToken);

module.exports = router;
