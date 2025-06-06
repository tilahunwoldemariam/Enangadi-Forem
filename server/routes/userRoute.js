const express = require('express');
const router = express.Router();

const { loginUser , register} = require('../controller/userController');
const authMidleWare = require('../middleware/authMiddleware');
router.post('/login', loginUser);
router.post ('/register',register);

module.exports = router;
