const dbConnection = require('./dbConfig');

async function createdbTable(req, res) {
  let userTable = `CREATE TABLE users(
      userId INT(20) NOT NULL AUTO_INCREMENT,
      username VARCHAR(20) NOT NULL,
      firstname VARCHAR(20) NOT NULL,
      lastname VARCHAR(20) NOT NULL,
      email VARCHAR(30) NOT NULL,
      password VARCHAR(100) NOT NULL,
      PRIMARY KEY(userId)
    )`;

  let questionsTable = `CREATE TABLE questions(
    id INT(20) NOT NULL AUTO_INCREMENT,
    questionid VARCHAR(100) NOT NULL UNIQUE,
    userid INT(20) NOT NULL,
    title VARCHAR(100) NOT NULL,
    description VARCHAR(200) NOT NULL,
    tag VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY(id, questionid),
    FOREIGN KEY(userid) REFERENCES users(userid)
)`;

  let answersTable = `CREATE TABLE answers(
    answerid INT(100) NOT NULL AUTO_INCREMENT,
    userid INT(20) NOT NULL,
    questionid VARCHAR(100) NOT NULL,
    answer TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY(answerid),
    FOREIGN KEY(questionid) REFERENCES questions(questionid),
    FOREIGN KEY(userid) REFERENCES users(userid)
  )`;

  try {
    await dbConnection.query(userTable);

    await dbConnection.query(questionsTable);

    await dbConnection.query(answersTable);

    res.end('Tables created successfully');
  } catch (error) {
    console.error(`Error creating tables: ${error.message}`);
    res.status(500).send('Error creating tables');
  }
}

module.exports = { createdbTable };
