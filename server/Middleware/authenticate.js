// const jwt = require('jsonwebtoken');  // Import the JWT library
// const User = require('../Models/userModel'); // Assuming you have a User model to check the user in the database

// // Middleware function to authenticate JWT tokens
// const authenticate = async (req, res, next) => {
//   // Get the token from the Authorization header (Format: "Bearer <token>")
//   const token = req.header('Authorization')?.replace('Bearer ', ''); // Remove the "Bearer " part

//   if (!token) {
//     return res.status(401).json({ message: 'Access denied. No token provided.' });
//   }

//   try {
//     // Verify the token
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);  // JWT_SECRET should be in your environment variables

//     // Find the user from the decoded token (assuming token contains userId)
//     const user = await User.findById(decoded.userId);
    
//     if (!user) {
//       return res.status(401).json({ message: 'User not found' });
//     }

//     // Attach the user object to the request for use in the next middleware or route handler
//     req.user = user;

//     // Proceed to the next middleware or route handler
//     next();
//   } catch (err) {
//     console.error(err);
//     return res.status(401).json({ message: 'Invalid token.' });
//   }
// };

// module.exports = { authenticate };









// const jwt = require('jsonwebtoken');

// const authenticate = (req, res, next) => {
//     const token = req.header('Authorization')?.replace('Bearer ', '');
//     console.log('Received token:', token);  // Add this log to verify token received
  
//     if (!token) {
//       return res.status(401).send({ error: 'Please authenticate. No token provided.' });
//     }
  
//     try {
//       const decoded = jwt.verify(token, process.env.JWT_SECRET);
//       req.user = decoded;
//       next();
//     } catch (error) {
//       console.error('Authentication failed:', error.message);
//       return res.status(401).send({ error: 'Authentication failed, invalid token or expired.' });
//     }
//   };
  

// module.exports = { authenticate };


















const jwt = require('jsonwebtoken');

const authenticate = (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    console.log('Received token:', token);  // Add this log to verify token received
  
    if (!token) {
      return res.status(401).send({ error: 'Please authenticate. No token provided.' });
    }
  
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;
      next();
    } catch (error) {
      console.error('Authentication failed:', error.message);
      return res.status(401).send({ error: 'Authentication failed, invalid token or expired.' });
    }
};

module.exports = { authenticate };
