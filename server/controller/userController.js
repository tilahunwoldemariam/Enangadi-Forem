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
      [username, email]
    );
    if (user.length > 0) {
      return res.status(StatusCodes.CONFLICT).json({
        error: "Conflict",
        msg: "User already existed",
      });
    }

    if (!username || !email || !firstname || !lastname || !password) {
      return res.status(StatusCodes.BAD_REQUEST).json({
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
  
    await dbConnection.query(
      `INSERT INTO users (username, firstname, lastname, email, password) VALUES (?, ?, ?, ?, ?)`,
      [username, firstname, lastname, email, hashedPswrd]
    );
    // Continue with saving to DB here...
    return res
      .status(StatusCodes.CREATED)
      .json({ msg: "User registered successfully" });
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: "Server Error",
      msg: error.message,
    });
  }
};
  

 module.exports={createTable,register }