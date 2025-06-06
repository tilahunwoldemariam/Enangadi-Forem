// //db connection
// const dbConnection=require("../db/dbConfig")

// async function createTable(req, res) {
//   // const {db} = require("../database/dbConfig");
//   let userTable = `CREATE TABLE users(
// userId INT(20) NOT NULL AUTO_INCREMENT,
// username VARCHAR(20) NOT NULL,
// firstname VARCHAR(20) NOT NULL,
// lastname VARCHAR(20) NOT NULL,
// email VARCHAR(30) NOT NULL,
// password VARCHAR(100) NOT NULL,
// PRIMARY KEY(userId)
// )`;

//   try {
//     await dbConnection.execute(userTable);
//     res.send("User table created successfully");
//   } catch (error) {
//     console.error("Error creating user table:", error);
//     res.status(500).send("Internal Server Error");
//   }
// }

// async function register(req,res){
//     res.send("register")

// }
// async function login(req,res) {
//     res.send("login")  
// }
// async function checkUser(req,res){
//     res.send("check")
// }
//     async function register(req, res){
//   const {username, firstname, lastname, email, password} = req.body;
//   if(!username||!email||!firstname||!lastname||!password){
//    return res.status(StatusCodes.BAD_REQUEST).json({
//      error: "Bad Request",
//      msg: "please, provide full information",
//    });
//   }

// }

// module.exports = {createTable, register,login,
// checkUser};


const dbConnection = require("../db/dbConfig");
const { StatusCodes } = require("http-status-codes"); // Ensure it's installed

// Create Users Table
async function createTable(req, res) {
  const userTable = `CREATE TABLE IF NOT EXISTS users (
    userId INT NOT NULL AUTO_INCREMENT,
    username VARCHAR(20) NOT NULL,
    firstname VARCHAR(20) NOT NULL,
    lastname VARCHAR(20) NOT NULL,
    email VARCHAR(30) NOT NULL,
    password VARCHAR(100) NOT NULL,
    PRIMARY KEY (userId)
  )`;

  try {
    await dbConnection.execute(userTable);
    res.send("User table created successfully");
  } catch (error) {
    console.error("Error creating user table:", error);
    res.status(500).send("Internal Server Error");
  }
}

// Register User
async function register(req, res) {
  const { username, firstname, lastname, email, password } = req.body;

  if (!username || !email || !firstname || !lastname || !password) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      error: "Bad Request",
      msg: "Please, provide full information",
    });
  }

  try {
    const INSERT = `INSERT INTO users (username, firstname, lastname, email, password) VALUES (?, ?, ?, ?, ?)`;
    await dbConnection.execute(INSERT, [username, firstname, lastname, email, password]);

    res.status(StatusCodes.CREATED).json({ msg: "User registered successfully" });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

// Placeholder Login Function
async function login(req, res) {
  res.send("login");
}

// Placeholder Check User Function
async function checkUser(req, res) {
  res.send("check");
}

module.exports = { createTable, register, login, checkUser };
