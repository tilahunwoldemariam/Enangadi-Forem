const dbConnection = require("../db/dbConfig")
console.log(dbConnection)
console.log("answer")
// server/controllers/answerController.js
const dbConnection = require("../db/dbConfig");
// Function to post an answer
async function postAnswer(req, res) {
    const { question_id, user_id, content } = req.body;

    if (!question_id || !user_id || !content) {
        return res.status(400).json({ error: "All fields are required" });
    }

    try {
        const query = "INSERT INTO answers (question_id, user_id, content) VALUES (?, ?, ?)";
        const [result] = await dbConnection.execute(query, [question_id, user_id, content]);
        res.status(201).json({ message: "Answer posted successfully", answerId: result.insertId });
    } catch (error) {
        console.error("Error posting answer:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}

// Function to get answers by question ID
async function getAnswersByQuestionId(req, res) {
    const { question_id } = req.params;

    if (!question_id) {
        return res.status(400).json({ error: "Question ID is required" });
    }

    try {
        const query = "SELECT * FROM answers WHERE question_id = ?";
        const [results] = await dbConnection.execute(query, [question_id]);
        res.status(200).json(results);
    } catch (error) {
        console.error("Error fetching answers:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}

// Export the functions for use in routes
module.exports = {
    postAnswer,
    getAnswersByQuestionId
};

// server/routes/answer.js
const express = require("express");
const router = express.Router();
const { postAnswer, getAnswersByQuestionId } = require("../controllers/answerController");

router.post("/", postAnswer);
router.get("/:question_id", getAnswersByQuestionId);


