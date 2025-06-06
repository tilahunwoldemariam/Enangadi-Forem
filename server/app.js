require('dotenv').config();
const express = require('express');
const cors = require('cors');
const dbConnection= require("./db/dbConfig")
const db= require('./db/dbConfig');
const dbConnection = require('./db/dbConfig');


// Initialize Express
const app = express();
const port = 8000;

// Middleware
app.use(cors());
//json middleware to extract json data
app.use(express.json());

// Test the backend listening
app.get('/', (req, res) => {
  res.send('Welcome to the Evangadi Forum API');
});

app.listen(port, (err) => {
  if (err) {
    console.error(`❌ Failed to start the server on port ${port}`);
  }

  console.log(`✅ Server is running on port http://localhost:${port}`);
});
