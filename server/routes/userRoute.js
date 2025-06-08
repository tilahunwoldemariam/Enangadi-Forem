const express = require("express");
const router = express.Router();


const {
  createTable,
  register,
  loginUser
 
} = require("../controller/userController");
//create database table
router.get("/create-table", createTable);
//register route
router.post("/register", register);
router.post("/login", loginUser);

//login route
router.post("/login", loginUser);
//user check router
// router.get("/check", authMidleWare, check);

module.exports = router;
