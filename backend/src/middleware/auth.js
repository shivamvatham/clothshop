const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
  // Development mode - skip authentication
  req.user = { id: 'dev-user', role: 'admin' };
  next();
  
  /*
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({ success: false, message: 'Access denied' });
    }
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ success: false, message: 'Invalid token' });
  }
  */
};

const adminAuth = (req, res, next) => {
  // Development mode - skip admin check
  next();
  
  /*
  if (req.user.role !== 'admin') {
    return res.status(403).json({ success: false, message: 'Admin access required' });
  }
  next();
  */
};

module.exports = { auth, adminAuth };