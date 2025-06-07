const mysql = require('mysql2');

// 1. Create the connection pool
const dbConnection = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER ,
  password: process.env.DB_PASSWORD, 
  database: process.env.DB_NAME ,
  connectionLimit: 10,
});


// tile test
// 3. Export for team usage
module.exports = dbConnection.promise();
