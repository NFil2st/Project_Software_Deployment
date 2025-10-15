const express = require('express');
const router = express.Router();
const { createTaskHandler } = require('../controllers/taskController');

router.post('/', createTaskHandler);

module.exports = router;
