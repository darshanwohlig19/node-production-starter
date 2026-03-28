const rateLimit = require('express-rate-limit');
const config = require('../config');
const { sendError } = require('../utils/response');

const globalLimiter = rateLimit({
  windowMs: config.rateLimit.windowMs,
  max: config.rateLimit.max,
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req, res) =>
    sendError(res, { statusCode: 429, message: 'Too many requests, please try again later.' }),
});

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req, res) =>
    sendError(res, { statusCode: 429, message: 'Too many login attempts, please try again in 15 minutes.' }),
});

module.exports = { globalLimiter, authLimiter };
