const { raw } = require('mysql2');
const express = require('express');
const router = express.Router()

//authentication middleware
const authMiddleware = require('../middleware/authMiddleware');
//use for userController
const{
    createTable,
    register,
    login,
    check,
    questions,
} = require('../controller/userController');
router.post("/createTable", (req, res) => {

//login user
router.post("/login",(req,res)=>{
    login(req,res)
})

//check user
router.get("/check",(req,res)=>{
    res.send("check user")
})
})

//questions routes middleware

//answers routes middleware

app.listen(prompt,(err)=>{
    if (err) {
        console.log(err)
    }
    else{
        console.log('listening on $(port)');
    }
})

module.exports = router;
