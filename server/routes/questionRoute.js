const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware")
const {postQuestion} = require("../controller/questionController")

router.post("/post-questions", authMiddleware, postQuestion);
const {getAllQuestions} = require("../controller/questionController")
router.get("/get-all-questions", authMiddleware, getAllQuestions);



module.exports = router;