const express = require('express');
const router = express.Router();
const taskRoutes = require('./taskRoutes');
const authRoutes = require('./authRoutes');

// Include all sub-routes
router.use('/auth', authRoutes);
router.use('/', taskRoutes);

module.exports = router;
