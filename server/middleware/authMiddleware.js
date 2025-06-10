<<<<<<< HEAD
const jwt = require("jsonwebtoken");
async function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer")) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ msg: "Authentication invalid" });
  }
  const token = authHeader.split(" ")[1];
  // console.log(authHeader)
  // console.log(token)
  try {
    const { username, userid } = jwt.verify(token, "secret");
=======
const jwt = require('jsonwebtoken');
const { StatusCodes } = require('http-status-codes');

async function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ msg: 'Authentication invalid' });
  }
  const token = authHeader.split(' ')[1];
  // console.log(authHeader)
  // console.log(token)
  try {
    const { username, userid } = jwt.verify(token, 'secret');
>>>>>>> 087b7389ead699679220182de9610da45bb5069e
    req.user = { username, userid };
    next();
  } catch (error) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
<<<<<<< HEAD
      .json({ msg: "Authentication invalid" });
=======
      .json({ msg: 'Authentication invalid' });
>>>>>>> 087b7389ead699679220182de9610da45bb5069e
  }
}
module.exports = authMiddleware;
