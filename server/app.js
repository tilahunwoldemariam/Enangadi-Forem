require('dotenv').config();
const express = require('express');
const cors = require('cors');
const dbConnection= require("./db/dbConfig")

const router = require('./routes/userRoute.js');
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


