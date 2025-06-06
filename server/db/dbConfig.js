const mysql = require('mysql2');

// 1. Create the connection pool
const dbConnection = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  connectionLimit: 10,
});

// 2. Test connection (callback style)
dbConnection.execute("select 'test' ", (err, result) => {
  // If there is an error, log it and exit
  if (err) {
    console.error('❌ Failed to connect to MySQL Database');
    console.error('Error details:', err.message);
    return;
  }

  console.log('✅ Successfully connected to MySQL Database result: ', result);
});

// tile test
// 3. Export for team usage
module.exports = dbConnection;
