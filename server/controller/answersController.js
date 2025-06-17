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
}

async function getAllAnswer(req, res) {
  const questionId = req.params.question_id;
  
  try {
    const [results] = await dbConnection.query(
      `SELECT 
        answers.answerid,
        answers.answer AS content,
        users.username,
        users.userid,
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
}

async function deleteAnswer(req, res) {
  const userId = req.user.userid; // Get the logged-in user's ID
  const answerId = req.params.id; // Get the answer ID from the route

  try {
    const [answer] = await dbConnection.query(
      'SELECT userid FROM answers WHERE answerid = ?',
      [answerId]
    );

    if (answer.length === 0) {
      return res.status(StatusCodes.NOT_FOUND).json({
        error: 'Not Found',
        msg: 'Answer not found',
      });
    }

    if (answer[0].userid !== userId) {
      return res.status(StatusCodes.FORBIDDEN).json({
        error: 'Forbidden',
        msg: 'You are not authorized to delete this answer',
      });
    }

    await dbConnection.query('DELETE FROM answers WHERE answerid = ?', [answerId]);

    res.status(StatusCodes.OK).json({ msg: 'Answer deleted successfully' });
  } catch (error) {
    console.error(error.message);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: 'Internal Server Error',
      msg: 'An unexpected error occurred',
    });
  }
}

module.exports = { postAnswers, getAllAnswer, deleteAnswer };

// const dbConnection = require('../db/dbConfig');

// const { StatusCodes } = require('http-status-codes');

// async function postAnswers(req, res) {
//   const userId = req.user.userid;
//   const { answer, questionid } = req.body;
//   if (!answer) {
//     return res.status(StatusCodes.BAD_REQUEST).json({
//       error: 'Bad Request',
//       msg: 'Please provide answer',
//     });
//   }
//   try {
//     await dbConnection.query(
//       'INSERT INTO answers(userid, questionid, answer) VALUES (?, ?, ?)',
//       [userId, questionid, answer]
//     );
//     res.status(StatusCodes.CREATED).json({
//       msg: 'Answer posted successfully',
//     });
//   } catch (error) {
//     console.log(error.message);
//     return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
//       error: 'Internal Server Error',
//       msg: 'An unexpected error occurred',
//     });
//   }
// }

// async function getAllAnswer(req, res) {
//   const questionId = req.params.question_Id;

//   try {
//     const [results] = await dbConnection.query(
//       `SELECT 
//         answers.answerid AS answer_id,
//         answers.answer AS content,
//         users.username,
//         answers.created_at,
//         users.firstname
//         FROM answers
//         JOIN users ON answers.userid = users.userId
//         WHERE answers.questionid = (
//         SELECT questionid FROM questions WHERE id = ?
//       )`,
//       [questionId]
//     );
//     // handle an error when answer no exist for specified question id in db
//     if (results.length === 0) {
//       return res.status(StatusCodes.NOT_FOUND).json({
//         error: 'Not Found',
//         msg: 'The requested answer could not be found',
//       });
//     }
//     res.status(StatusCodes.OK).json({ answer: results });
//   } catch (error) {
//     console.log(error.message);
//     res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
//       error: 'Internal Server Error',
//       msg: 'An unexpected error occurred',
//     });
//   }

//   // res.send("here is an answer")
// }

// async function deleteAnswer(req, res) {
//   const userId = req.user.userid; // Get the logged-in user's ID
//   const answerId = req.params.Id; // Get the answer ID from the route

//   try {
//     const [answer] = await dbConnection.query(
//       'SELECT userid FROM answers WHERE id = ?',
//       [answerId]
//     );

//     if (answer.length === 0) {
//       return res.status(StatusCodes.NOT_FOUND).json({
//         error: 'Not Found',
//         msg: 'Answer not found',
//       });
//     }

//     if (answer[0].userid !== userId) {
//       return res.status(StatusCodes.FORBIDDEN).json({
//         error: 'Forbidden',
//         msg: 'You are not authorized to delete this answer',
//       });
//     }

//     await dbConnection.query('DELETE FROM answers WHERE id = ?', [answerId]);

//     res.status(StatusCodes.OK).json({ msg: 'Answer deleted successfully' });
//   } catch (error) {
//     console.error(error.message);
//     res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
//       error: 'Internal Server Error',
//       msg: 'An unexpected error occurred',
//     });
//   }
// }

// module.exports = { postAnswers, deleteAnswer, getAllAnswer };
