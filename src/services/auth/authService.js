const User = require('../../models/user');
const { signAccessToken, signRefreshToken, verifyRefreshToken } = require('../../utils/jwt');
const { getRedis } = require('../../config/redis');
const config = require('../../config');

const REFRESH_TOKEN_PREFIX = 'refresh_token:';

const register = async ({ name, email, password }) => {
  const existing = await User.findOne({ email });
  if (existing) {
    const err = new Error('Email already in use');
    err.statusCode = 409;
    throw err;
  }

  const user = await User.create({ name, email, password });
  return { user };
};

const login = async ({ email, password }) => {
  const user = await User.findOne({ email }).select('+password');
  if (!user || !(await user.comparePassword(password))) {
    const err = new Error('Invalid email or password');
    err.statusCode = 401;
    throw err;
  }

  if (!user.isActive) {
    const err = new Error('Your account has been deactivated');
    err.statusCode = 403;
    throw err;
  }

  const payload = { id: user._id, role: user.role };
  const accessToken = signAccessToken(payload);
  const refreshToken = signRefreshToken(payload);

  // Store refresh token in Redis
  const redis = getRedis();
  const ttlSeconds = 7 * 24 * 60 * 60; // 7 days
  await redis.set(`${REFRESH_TOKEN_PREFIX}${user._id}`, refreshToken, 'EX', ttlSeconds);

  user.lastLogin = new Date();
  await user.save({ validateBeforeSave: false });

  return { user, accessToken, refreshToken };
};

const refreshTokens = async (token) => {
  let decoded;
  try {
    decoded = verifyRefreshToken(token);
  } catch {
    const err = new Error('Invalid or expired refresh token');
    err.statusCode = 401;
    throw err;
  }

  const redis = getRedis();
  const stored = await redis.get(`${REFRESH_TOKEN_PREFIX}${decoded.id}`);

  if (!stored || stored !== token) {
    const err = new Error('Refresh token reuse detected or session expired');
    err.statusCode = 401;
    throw err;
  }

  const user = await User.findById(decoded.id);
  if (!user || !user.isActive) {
    const err = new Error('User not found or inactive');
    err.statusCode = 401;
    throw err;
  }

  const payload = { id: user._id, role: user.role };
  const newAccessToken = signAccessToken(payload);
  const newRefreshToken = signRefreshToken(payload);

  const ttlSeconds = 7 * 24 * 60 * 60;
  await redis.set(`${REFRESH_TOKEN_PREFIX}${user._id}`, newRefreshToken, 'EX', ttlSeconds);

  return { accessToken: newAccessToken, refreshToken: newRefreshToken };
};

const logout = async (userId) => {
  const redis = getRedis();
  await redis.del(`${REFRESH_TOKEN_PREFIX}${userId}`);
};

module.exports = { register, login, refreshTokens, logout };
