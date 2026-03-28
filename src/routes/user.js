const router = require('express').Router();
const Joi = require('joi');
const userController = require('../controllers/user/userController');
const { authenticate, authorize } = require('../middlewares/auth');
const validate = require('../middlewares/validate');

const updateProfileSchema = Joi.object({
  name: Joi.string().min(2).max(100),
});

router.use(authenticate);

router.get('/me', userController.getProfile);
router.patch('/me', validate(updateProfileSchema), userController.updateProfile);

// Admin only routes
router.get('/', authorize('admin'), userController.getAllUsers);
router.delete('/:id', authorize('admin'), userController.deleteUser);

module.exports = router;
