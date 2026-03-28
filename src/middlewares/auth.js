const { verifyAccessToken } = require('../utils/jwt');
const { sendError } = require('../utils/response');
const User = require('../models/user');

const authenticate = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return sendError(res, { statusCode: 401, message: 'Access token missing' });
    }

    const token = authHeader.split(' ')[1];
    const decoded = verifyAccessToken(token);

    const user = await User.findById(decoded.id).select('-password');
    if (!user || !user.isActive) {
      return sendError(res, { statusCode: 401, message: 'User not found or inactive' });
    }

    req.user = user;
    next();
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      return sendError(res, { statusCode: 401, message: 'Access token expired' });
    }
    return sendError(res, { statusCode: 401, message: 'Invalid access token' });
  }
};

const authorize = (...roles) => (req, res, next) => {
  if (!roles.includes(req.user.role)) {
    return sendError(res, { statusCode: 403, message: 'You do not have permission to perform this action' });
  }
  next();
};

module.exports = { authenticate, authorize };
