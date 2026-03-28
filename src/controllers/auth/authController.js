const authService = require('../../services/auth/authService');
const { sendSuccess, sendError } = require('../../utils/response');

const register = async (req, res, next) => {
  try {
    const { user } = await authService.register(req.body);
    return sendSuccess(res, { statusCode: 201, message: 'Account created successfully', data: { user } });
  } catch (err) {
    next(err);
  }
};

const login = async (req, res, next) => {
  try {
    const { user, accessToken, refreshToken } = await authService.login(req.body);
    return sendSuccess(res, {
      statusCode: 200,
      message: 'Login successful',
      data: { user, accessToken, refreshToken },
    });
  } catch (err) {
    next(err);
  }
};

const refresh = async (req, res, next) => {
  try {
    const { refreshToken } = req.body;
    if (!refreshToken) {
      return sendError(res, { statusCode: 400, message: 'Refresh token is required' });
    }
    const tokens = await authService.refreshTokens(refreshToken);
    return sendSuccess(res, { message: 'Tokens refreshed', data: tokens });
  } catch (err) {
    next(err);
  }
};

const logout = async (req, res, next) => {
  try {
    await authService.logout(req.user._id);
    return sendSuccess(res, { message: 'Logged out successfully' });
  } catch (err) {
    next(err);
  }
};

module.exports = { register, login, refresh, logout };
