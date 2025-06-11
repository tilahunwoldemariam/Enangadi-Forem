const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware")

// const {} = require("../controller/questionController")

const {
  getAllQuestions,
  postQuestion,
  getSingleQuestion,
} = require('../controller/questionController');
router.post("/post-questions", authMiddleware, postQuestion);

router.get("/all-questions", authMiddleware, getAllQuestions);

router.get('/:id', authMiddleware, getSingleQuestion);



module.exports = router;