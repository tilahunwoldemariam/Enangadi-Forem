require('dotenv').config();
const express = require('express');
const cors = require('cors');
const db= require('./db/dbConfig');
const dbConnection = require('./db/dbConfig');


// Initialize Express
const app = express();
const port = 8000;

// Middleware
app.use(cors());
app.use(express.json());
// Routes
const {createTable, register}= require('./controller/userController');
app.post("/register", register);
app.get("/create-table", createTable);
app.post("/login", login);
app.get("/check-user", checkUser);

// Test the backend listening
app.get('/', (req, res) => {
  res.send('Welcome to the Evangadi Forum API');
});
async function dbstart() {
  try{
    await dbConnection.execute("select'test'");
    app.listen(port, () => {
      console.log(` server is running on port http://localhost:${port}`);
  });
  }catch(err){
    console.log(err);
  }
}

dbstart();
