const express = require("express");
const router = express.Router();
//authorization middleware
// const authMidleWare = require("../middleware/authMiddleware");
//use from uusercontroller
const {
  createTable,
  register,
 
} = require("../controller/userController");
//create database table
router.get("/create-table", createTable);
//register route
router.post("/register", register);
//login route
// router.post("/login", login);
//user check router
// router.get("/check", authMidleWare, check);

module.exports = router;
