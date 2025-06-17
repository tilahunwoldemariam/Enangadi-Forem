const express = require('express');
const router = express.Router();


const {
  register,
  loginUser,
  checkUser,
  resetPassword,
} = require('../controller/userController');
const authMiddleware = require('../middleware/authMiddleware');

//register route
router.post('/register', register);

//login route
router.post('/login', loginUser);

//user check router
router.get('/check', authMiddleware, checkUser);

// password reset
router.post('/reset-password', resetPassword);

// user profile
// router.get('/profile/:userid', authMiddleware, getUserProfile);

module.exports = router;
