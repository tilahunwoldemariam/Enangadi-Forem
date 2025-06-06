// controllers/userController.js
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dbConnection = require('../db/dbConfig');
const {StatusCodes} = require('http-status-codes');
// for registration
async function register(req, res) {
  const { username, firstname, lastname, email, password } = req.body;

  if (!username || !email || !firstname || !lastname || !password) {
    return res.status(StatusCodes.BAD_REQUEST).json({ msg: "Please provide full information" });
  }

  try {
    const [user] = await dbConnection.query(
      "SELECT username, userid,firstname, lastname, email ,password FROM users WHERE username=? OR email=?",
      [username, email]
    );

    if (user.length > 0) {
      return res.status(StatusCodes.BAD_REQUEST).json({ msg: "User already exists" });
    }

    if (password.length <= 7) {
      return res.status(StatusCodes.BAD_REQUEST).json({ msg: "Password must be at least 8 characters" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedpswrd = await bcrypt.hash(password, salt);

    const [result] = await dbConnection.query(
      "INSERT INTO users(username, firstname, lastname, email, password) VALUES (?,?,?,?,?)",
      [username, firstname, lastname, email, hashedpswrd]
    );

    const token = jwt.sign({ id: result.insertId }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    return res.status(StatusCodes.CREATED).json({ msg: "You are successfully registered", token });
  } catch (error) {
    console.error(error.message);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: "Something went wrong, try later" });
  }
}

// for login
  async function loginUser (req, res) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      error: 'Bad Request',
      message: 'Please provide all required fields!',
    });
  }

try {
    const [user] = await dbConnection.query("SELECT userid, username, password FROM users WHERE email = ?",[email]
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
    const username = user[0].username
    const userid = user[0].userid
        const token = jwt.sign({ username, userid }, process.env.JWT_SECRET, {
        expiresIn: '1h',
    });

    res.status(200).json({
      message: 'User login successful',
      token,
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
    console.error(err.message);
  }}
// forgot password
// Inside userController.js
async function forgotPassword(req, res) {
  const { email } = req.body;
  if (!email) return res.status(400).json({ message: "Email is required" });

  // Optional: check if user exists, send reset email, etc.
  return res.status(200).json({ message: "Password reset link sent (mock)" });
}

module.exports = { loginUser, register, forgotPassword};
