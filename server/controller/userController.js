<<<<<<< HEAD
 const dbConnection = require("../db/dbConfig")
 const { StatusCodes } = require("http-status-codes");
 const bcrypt = require("bcrypt")

  async function createTable(req, res) {
    
    let userTable = `CREATE TABLE users(
  userId INT(20) NOT NULL AUTO_INCREMENT,
  username VARCHAR(20) NOT NULL,
  firstname VARCHAR(20) NOT NULL,
  lastname VARCHAR(20) NOT NULL,
  email VARCHAR(30) NOT NULL,
  password VARCHAR(100) NOT NULL,
  PRIMARY KEY(userId)
  
)`;

try {
  await dbConnection.query(userTable);
  console.log("User table created");res.end("Tables created successfully");
} catch (error) {
  console.error(`Error creating tables: ${error.message}`);
  res.status(500).send("Error creating tables");
}

}

async function register(req, res) {
  const { username, firstname, lastname, email, password } = req.body;
  try {
    const [user] = await dbConnection.query(
      "select username, userId from users where username=? or email=?",
=======
const dbConnection = require('../db/dbConfig');
const { StatusCodes } = require('http-status-codes');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

async function register(req, res) {
  // Logic for user registration
  const { username, firstname, lastname, email, password } = req.body;
  try {
    const [user] = await dbConnection.query(
      'select username, userId from users where username=? or email=?',
>>>>>>> 087b7389ead699679220182de9610da45bb5069e
      [username, email]
    );
    if (user.length > 0) {
      return res.status(StatusCodes.CONFLICT).json({
<<<<<<< HEAD
        error: "Conflict",
        msg: "User already existed",
=======
        error: 'Conflict',
        msg: 'User already existed',
>>>>>>> 087b7389ead699679220182de9610da45bb5069e
      });
    }

    if (!username || !email || !firstname || !lastname || !password) {
      return res.status(StatusCodes.BAD_REQUEST).json({
<<<<<<< HEAD
        error: "Bad Request",
        msg: "Please, provide full information",
      });
    }
    if(password.length <= 8){
      return res.status(StatusCodes.BAD_REQUEST).json({
        "msg": "password length should be at least 8 character"
      })
    }
    const genString =await bcrypt.genSalt(10);
    // console.log(genString);
    const hashedPswrd = await bcrypt.hash(password, genString )
    // console.log(hashedPswrd);
  
=======
        error: 'Bad Request',
        msg: 'Please, provide full information',
      });
    }
    if (password.length <= 8) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        msg: 'password length should be at least 8 character',
      });
    }
    const genString = await bcrypt.genSalt(10);
    // console.log(genString);
    const hashedPswrd = await bcrypt.hash(password, genString);
    // console.log(hashedPswrd);

>>>>>>> 087b7389ead699679220182de9610da45bb5069e
    await dbConnection.query(
      `INSERT INTO users (username, firstname, lastname, email, password) VALUES (?, ?, ?, ?, ?)`,
      [username, firstname, lastname, email, hashedPswrd]
    );
    // Continue with saving to DB here...
    return res
      .status(StatusCodes.CREATED)
<<<<<<< HEAD
      .json({ msg: "User registered successfully" });
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: "Server Error",
      msg: error.message,
    });
  }
};
  

 module.exports={createTable,register }
=======
      .json({ msg: 'User registered successfully' });
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: 'Server Error',
      msg: error.message,
    });
  }
}

async function loginUser(req, res) {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({
      error: 'Bad Request',
      message: 'Please provide all required fields!',
    });
  }
  try {
    const [user] = await dbConnection.query(
      'SELECT userid, username, password FROM users WHERE email = ?',
      [email]
    );
    if (user.length === 0) {
      return res.status(401).json({
        error: 'Unauthorized',
        message: 'Invalid credential',
      });
    }
    const isMatch = await bcrypt.compare(password, user[0].password);
    if (!isMatch) {
      return res.status(401).json({
        error: 'Unauthorized',
        message: 'Invalid password',
      });
    }
    const username = user[0].username;
    const userid = user[0].userid;
    const token = jwt.sign({ username, userid }, 'secret', {
      expiresIn: '1h',
    });
    res.status(200).json({
      message: 'User login successful',
      token,
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
    console.error(err.message);
  }
}

async function checkUser(req, res) {
  // Logic to check user status
  const { username, userid } = req.user; // Extract user info from request object

  res
    .status(StatusCodes.OK)
    .json({ msg: 'User is authenticated', username, userid });
}

module.exports = { register, loginUser, checkUser };
>>>>>>> 087b7389ead699679220182de9610da45bb5069e
