const express = require('express');
const router = express.Router();

const { loginUser ,forgotPassword, register} = require('../controller/userController');
// const authMidleWare = require('../middleware/authMiddleware');

const {
  createTable,
  register,
 loginUser,
 forgotPassword,
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

module.exports = router;
