require('dotenv').config();
const express = require('express');
const cors = require('cors');
<<<<<<< HEAD
const dbConnection= require("./db/dbConfig")
=======
// db connection
const dbConnection = require('./db/dbConfig');

// authentication middleware
const authMiddleware = require('./middleware/authMiddleware');
>>>>>>> 087b7389ead699679220182de9610da45bb5069e

// Initialize Express
const app = express();
const port = 8000;

// Middleware
app.use(cors());
//json middleware to extract json data
app.use(express.json());

const { createTable, register } = require("./controller/userController");
app.get("/create-table", createTable);
//user middle ware{
 const userRoute = require("./routes/userRoute")
 app.use("/api/users", userRoute);


// Test the backend listening
app.get('/', (req, res) => {
  res.send('Welcome to the Evangadi Forum API');
});
<<<<<<< HEAD
async function dbstart() {
  try {
    await dbConnection.execute("select 'test'")
    app.listen(port)
    console.log("dbconnected");
    console.log(` Server is running on port http://localhost:${port}`);
    
  } catch (error) {
    console.log(error.message);
    
  }
  
}
dbstart();


=======

// User routes middleware
const userRoutes = require('./routes/userRoute');
app.use('/api/users', userRoutes);

// Question routes middleware
const questionRoutes = require('./routes/questionRoute');
app.use('/api/questions', authMiddleware,  questionRoutes);

// Answer routes middleware
const answerRoutes = require('./routes/answerRoute');
app.use('/api/answers', authMiddleware, answerRoutes);

async function start() {
  try {
    const res = await dbConnection.execute("SELECT 'test'");
    app.listen(port, () => {
      console.log(`✅ Server is running on port http://localhost:${port}`);
    });
    console.log('✅ Successfully connected to MySQL Database');
} catch (error) {
  console.error('❌ Error setting up the server:', error.message);
  }
}

start();

// app.listen(port, (err) => {
//   if (err) {
//     console.error(`❌ Failed to start the server on port ${port}`);
//   }

//   console.log(`✅ Server is running on port http://localhost:${port}`);
// });
>>>>>>> 087b7389ead699679220182de9610da45bb5069e
