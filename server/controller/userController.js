const dbConnection = require("../db/dbConfig");
const { StatusCodes } = require("http-status-codes");
const bcrypt = require("bcrypt");

async function register(req, res) {
  // Logic for user registration
  const { username, firstname, lastname, email, password } = req.body;

  if (!username || !firstname || !lastname || !email || !password) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: "All fields are required" });
  }

  try {
    const [existingUser] = await dbConnection.query(
      "SELECT username, userid FROM users WHERE username = ? or email= ?",
      [username, email]
    );
    if (existingUser.length > 0) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ msg: "User already registered" });
    }

    if (password.length < 8) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ msg: "Password must be at least 8 characters long" });
    }

    // Hash the password (assuming you have a hashing function)
    const salt = await bcrypt.genSalt(10);
    if (!salt) {
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ msg: "Error generating salt for password hashing" });
    }

    const hashedPassword = await bcrypt.hash(password, salt);

    await dbConnection.query(
      "INSERT INTO users (username, firstname, lastname, email, password) VALUES (?, ?, ?, ?, ?)",
      [username, firstname, lastname, email, hashedPassword]
    );

    return res
      .status(StatusCodes.CREATED)
      .json({ msg: "User registered successfully" });
  } catch (error) {
    console.error("Error during registration:", error.message);

    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      msg: "Something went wrong during registration, please try again later.",
    });
  }
}

module.exports = { createTable, register };
