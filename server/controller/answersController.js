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
  const userId = req.user.userid; // Get the logged-in user's ID

  try {
    const [results] = await dbConnection.query(
      `SELECT 
        answers.answerid,
        answers.answer AS content,
        users.username,
        users.userid,
        answers.created_at,
        answers.likes,
        answers.dislikes,
        users.firstname,
        (SELECT vote_type FROM answer_votes WHERE answer_votes.answerid = answers.answerid AND answer_votes.userid = ?) AS userVote
      FROM answers
      JOIN users ON answers.userid = users.userId
      WHERE answers.questionid = (
        SELECT questionid FROM questions WHERE id = ?
      )`,
      [userId, questionId]
    );

    // Handle case where no answers are found
    if (results.length === 0) {
      return res.status(StatusCodes.NOT_FOUND).json({
        error: 'Not Found',
        msg: 'The requested answer could not be found',
      });
    }

    res.status(StatusCodes.OK).json({ answer: results });
  } catch (error) {
    console.error(error.message);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: 'Internal Server Error',
      msg: 'An unexpected error occurred',
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

async function voteAnswer(req, res) {
  const userId = req.user.userid;
  const answerId = req.params.id;
  const { voteType } = req.body; // `voteType` can be 'like' or 'dislike'

  try {
    // Check if the user has already voted for this answer
    const [existingVote] = await dbConnection.query(
      'SELECT * FROM answer_votes WHERE userid = ? AND answerid = ?',
      [userId, answerId]
    );

    if (existingVote.length > 0) {
      // If the user has already voted, check if the vote type matches
      if (existingVote[0].vote_type === voteType) {
        // Remove the vote from the answer_votes table
        await dbConnection.query(
          'DELETE FROM answer_votes WHERE userid = ? AND answerid = ?',
          [userId, answerId]
        );

        // Decrease the likes or dislikes count in the answers table
        if (voteType === 'like') {
          await dbConnection.query(
            'UPDATE answers SET likes = likes - 1 WHERE answerid = ?',
            [answerId]
          );
        } else if (voteType === 'dislike') {
          await dbConnection.query(
            'UPDATE answers SET dislikes = dislikes - 1 WHERE answerid = ?',
            [answerId]
          );
        }

        return res
          .status(StatusCodes.OK)
          .json({ msg: 'Vote removed successfully' });
      }
    }

    // Record the vote in the answer_votes table
    await dbConnection.query(
      'INSERT INTO answer_votes (userid, answerid, vote_type) VALUES (?, ?, ?)',
      [userId, answerId, voteType]
    );

    // Update the likes or dislikes count in the answers table
    if (voteType === 'like') {
      await dbConnection.query(
        'UPDATE answers SET likes = likes + 1 WHERE answerid = ?',
        [answerId]
      );
    } else if (voteType === 'dislike') {
      await dbConnection.query(
        'UPDATE answers SET dislikes = dislikes + 1 WHERE answerid = ?',
        [answerId]
      );
    } else {
      return res.status(StatusCodes.BAD_REQUEST).json({
        error: 'Bad Request',
        msg: 'Invalid vote type',
      });
    }

    res.status(StatusCodes.OK).json({ msg: 'Vote recorded successfully' });
  } catch (error) {
    console.error(error.message);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: 'Internal Server Error',
      msg: 'An unexpected error occurred',
    });
  }
}

module.exports = { postAnswers, getAllAnswer, deleteAnswer, voteAnswer };
