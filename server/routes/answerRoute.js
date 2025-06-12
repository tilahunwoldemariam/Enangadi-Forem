const dbConnection = require("../db/dbConfig")
const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const { postAnswers } = require('../controller/answersController');
router.post('/postanswer', authMiddleware, postAnswers);
const { getAllAnswer } = require('../controller/answersController');
router.get('/:question_Id', authMiddleware, getAllAnswer);




module.exports = router;
 
// answerRoute.js


// const express = require("express");
// const router = express.Router();
// const { postAnswers, getAllAnswer } = require("../controllers/answerController");
// const authenticate = require("../middleware/authenticate"); // If you have authentication

// // Get all answers for a question
// router.get("/:question_Id", getAllAnswer);

// // Post a new answer (protected route)
// router.post("/", authenticate, postAnswers);

// module.exports = router;