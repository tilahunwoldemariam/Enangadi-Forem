<<<<<<< HEAD
const express = require("express");
const router = express.Router();
=======
const express = require('express');
const router = express.Router();

>>>>>>> 087b7389ead699679220182de9610da45bb5069e
//authorization middleware
// const authMidleWare = require("../middleware/authMiddleware");
//use from uusercontroller
const {
<<<<<<< HEAD
  createTable,
  register,
 
} = require("../controller/userController");
//create database table
router.get("/create-table", createTable);
//register route
router.post("/register", register);
router.post('/login', loginUser);
router.post('/forgotpassword', forgotPassword);
//login route
// router.post("/login", login);
//user check router
// router.get("/check", authMidleWare, check);
=======
  register,
  loginUser,
  checkUser,
} = require('../controller/userController');
const authMiddleware = require('../middleware/authMiddleware');

//register route
router.post('/register', register);

//login route
router.post('/login', loginUser);

//user check router
router.get('/check', authMiddleware, checkUser);
>>>>>>> 087b7389ead699679220182de9610da45bb5069e

module.exports = router;
