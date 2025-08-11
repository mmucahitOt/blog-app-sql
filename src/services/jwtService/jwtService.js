const jwt = require("jsonwebtoken");
const { jwtSecret } = require("../../utils/config");

const generateToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: "99h",
  });
};

const verifyToken = (token) => {
  return jwt.verify(token, jwtSecret);
};

module.exports = { generateToken, verifyToken };
