const {StatusCodes} = require("http-status-codes")
const dbConnection = require("../db/dbConfig")
const { v4: uuidv4 } = require("uuid");

async function postQuestion(req, res){
    const userId = req.user.userid;
      console.log(userId);
    const questionid = uuidv4();
    console.log(questionid)
    const { title, description, tag } = req.body;
    if (!title || !description || !tag) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        error: "Bad Request",
        msg: "Please provide all required fields",
      });
    }

try {
    await dbConnection.query(
      'INSERT INTO questions (userid, questionid, title, description, tag) VALUES (?, ?, ?, ?, ?)',
      [userId, questionid, title, description, tag]
    );
       res.status(StatusCodes.CREATED).json({ msg: "Question created successfully", questionid });    
} catch (error) {
    console.log(error)
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: "Internal Server Error",
      message: "An unexpected error occurred.",
    });
    
}
}





async function getAllQuestions(req, res) {
  try {
    const [results] = await dbConnection.query(`
        SELECT 
          questions.id AS question_id,
          questions.title,
          questions.description AS content,
          users.username AS user_name,
          questions.created_at
        FROM questions
        JOIN users ON questions.userid = users.userId
        ORDER BY questions.created_at DESC
      `);
    // handler when there is no question posted to database
    if (!results || results.length === 0) {
      return res.status(StatusCodes.NOT_FOUND).json({
        msg: "No questions found",
      });
    }
    res.status(StatusCodes.OK).json({ questions: results });
  } catch (error) {
    console.log(error.message);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: "Internal Server Error",
      msg: "An unexpected error occurred.",
    });
  }
  // res.send("all question here");
}



module.exports = { postQuestion, getAllQuestions };