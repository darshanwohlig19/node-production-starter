const userService = require('../../services/user/userService');
const { sendSuccess } = require('../../utils/response');

const getProfile = async (req, res, next) => {
  try {
    const user = await userService.getProfile(req.user._id);
    return sendSuccess(res, { data: { user } });
  } catch (err) {
    next(err);
  }
};

const updateProfile = async (req, res, next) => {
  try {
    const user = await userService.updateProfile(req.user._id, req.body);
    return sendSuccess(res, { message: 'Profile updated', data: { user } });
  } catch (err) {
    next(err);
  }
};

const getAllUsers = async (req, res, next) => {
  try {
    const { page, limit } = req.query;
    const result = await userService.getAllUsers({ page: +page || 1, limit: +limit || 10 });
    return sendSuccess(res, { data: result });
  } catch (err) {
    next(err);
  }
};

const deleteUser = async (req, res, next) => {
  try {
    await userService.deleteUser(req.params.id);
    return sendSuccess(res, { message: 'User deleted successfully' });
  } catch (err) {
    next(err);
  }
};

module.exports = { getProfile, updateProfile, getAllUsers, deleteUser };
