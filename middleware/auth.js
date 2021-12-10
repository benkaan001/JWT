
const jwt = require("jsonwebtoken");
const{NotAuthenticatedError}=require('../errors')


const isAuthenticated = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new NotAuthenticatedError("No token provided");
  }

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // console.log(decoded);
    const { id, username } = decoded;
    req.user = { id, username };
    next();
  } catch (error) {
    throw new NotAuthenticatedError("Not authorized to access this route");
  }
};

module.exports = isAuthenticated;
