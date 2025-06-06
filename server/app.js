require('dotenv').config();
const express = require('express');
const cors = require('cors');
const router = require('./routes/userRoute.js');
// Initialize Express
const app = express();
const port = process.env.PORT || 8000;

// Middleware
app.use(cors());
app.use(express.json());
// Login 
app.use('/api/users', router);
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
