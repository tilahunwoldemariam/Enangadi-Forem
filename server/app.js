require('dotenv').config();
const express = require('express');
const cors = require('cors');
const dbConnection = require('./db/dbConfig');
// Initialize Express
const app = express();
const port = process.env.PORT || 8000;

// Middleware
app.use(cors());
//json middleware to extract json data
app.use(express.json());

// Test the backend listening
app.get('/', (req, res) => {
  res.send('Welcome to the Evangadi Forum API');
});

const { register } = require('./controller/userController');
//user middleware
const userRoute = require('./routes/userRoute');
app.use('/api/users', userRoute);
//  question middleware

// Question routes middleware
const questionRoute = require('./routes/questionRoute');
app.use('/api/questions', questionRoute);

// Answer routes middleware
const answerRoute = require('./routes/answerRoute');
app.use('/api/answers', answerRoute);

async function dbstart() {
  try {
    await dbConnection.execute("SELECT 'test'");
    app.listen(port, () => {
      console.log(`✅ Server is running on port http://localhost:${port}`);
    });
    console.log('✅ Successfully connected to MySQL Database');
  } catch (error) {
    console.error('❌ Error setting up the server:', error.message);
  }
}
dbstart();

// app.listen(8000, (err)=>{
//   console.log(err)
//   console
// })
