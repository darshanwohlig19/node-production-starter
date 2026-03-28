const router = require('express').Router();
const authRoutes = require('./auth');
const userRoutes = require('./user');

router.get('/health', (req, res) => {
  res.json({ success: true, message: 'Server is up and running', timestamp: new Date().toISOString() });
});

router.use('/auth', authRoutes);
router.use('/users', userRoutes);

module.exports = router;
