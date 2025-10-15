const express = require('express');
const router = express.Router();
const taskRoutes = require('./taskRoutes');

// รวม route ย่อยทั้งหมดไว้ที่นี่
router.use('/tasks', taskRoutes);

module.exports = router;
