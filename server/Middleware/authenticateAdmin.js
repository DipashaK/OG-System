const jwt = require("jsonwebtoken");
const authenticateAdmin = (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");

  console.log("Token received:", token); 
  if (!token) {
    return res.status(401).json({ error: "Authentication failed, no token provided." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    console.error("Error verifying token:", error); 
    res.status(401).json({ error: "Invalid token" });
  }
};


module.exports = authenticateAdmin;
