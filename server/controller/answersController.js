const dbConnection = require("../db/dbConfig");

const { StatusCodes } = require("http-status-codes");

async function postAnswers(req, res) {
  const userId = req.user.userid;
  const { answer, questionid } = req.body;
  if (!answer) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      error: "Bad Request",
      msg: "Please provide answer",
    });
  }
  try {
    await dbConnection.query(
      "INSERT INTO answers(userid, questionid, answer) VALUES (?, ?, ?)",
      [userId, questionid, answer]
    );
    res.status(StatusCodes.CREATED).json({
      msg: "Answer posted successfully",
    });
  } catch (error) {
    console.log(error.message);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: "Internal Server Error",
      msg: "An unexpected error occurred",
    });
  }
  // res.send("answer")
}

async function getAllAnswer(req, res) {
  const questionId = req.params.question_Id;
  // console.log(answerId);
  try {
    const [results] = await dbConnection.query(
      `SELECT 
        answers.answerid AS answer_id,
        answers.answer AS content,
        users.username,
        answers.created_at,
        users.firstname
        FROM answers
        JOIN users ON answers.userid = users.userId
        WHERE answers.questionid = (
        SELECT questionid FROM questions WHERE id = ?
      )`,
      [questionId]
    );
    // handle an error when answer no exist for specified question id in db
    if (results.length === 0) {
      return res.status(StatusCodes.NOT_FOUND).json({
        error: "Not Found",
        msg: "The requested answer could not be found",
      });
    }
    res.status(StatusCodes.OK).json({ answer: results });
  } catch (error) {
    console.log(error.message);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: "Internal Server Error",
      msg: "An unexpected error occurred",
    });
  }

  // res.send("here is an answer")
}

module.exports = { postAnswers, getAllAnswer };
