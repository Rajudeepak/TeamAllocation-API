const jwt = require('jsonwebtoken');
require('dotenv').config();

const authenticateUser = (req, res, next) => {
  try {
    
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'Authorization token is missing' });
    }

    const decoded = jwt.verify(token, process.env.key);

    req.user = {
      id: decoded.adminId,
    };
    
    next();
  } catch (error) {
    console.error(error);
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
};

module.exports = { authenticateUser };
