const dbConnection = require("../db/dbConfig")
const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const { postAnswers } = require('../controller/answersController');
router.post('/postanswer', authMiddleware, postAnswers);
const { getAllAnswer } = require('../controller/answersController');
router.get('/:question_Id', authMiddleware, getAllAnswer);




module.exports = router;
 