const jwt = require('jsonwebtoken');
const User = require('../models/User');
const store = require('../config/store');
const { getIsMongoConnected } = require('../config/db');

const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET || 'atelier_luxury_jackets_super_secret_jwt_key_2026'
      );

      if (getIsMongoConnected()) {
        req.user = await User.findById(decoded.id).select('-password');
      } else {
        req.user = store.users.find(u => u._id === decoded.id || u.email === decoded.email);
      }

      if (!req.user) {
        return res.status(401).json({ success: false, message: 'User not found or authorization revoked' });
      }

      next();
    } catch (error) {
      console.error('JWT Verification Error:', error.message);
      return res.status(401).json({ success: false, message: 'Token is invalid or expired' });
    }
  } else {
    return res.status(401).json({ success: false, message: 'Not authorized, no bearer token provided' });
  }
};

const adminOnly = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    res.status(403).json({ success: false, message: 'Access denied: Master Admin privileges required' });
  }
};

module.exports = { protect, adminOnly };
