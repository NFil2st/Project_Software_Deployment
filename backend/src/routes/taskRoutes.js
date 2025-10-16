const express = require('express');
const router = express.Router();
const { createTaskHandler, getTasksHandler, updateTaskHandler, deleteTaskHandler } = require('../controllers/taskController');
const { 
    sumTransactionsHandler, 
    convertCurrencyHandler 
} = require('../controllers/transactionController');

// --- Spec C	Create record ---
router.post('/tasks', createTaskHandler);

// --- Spec D	Summary ---
router.post('/sum', sumTransactionsHandler); 

// --- Spec G	Currency conversion ---
router.post('/currency/convert', convertCurrencyHandler);

router.get('/', getTasksHandler);
router.put('/:id', updateTaskHandler);
router.delete('/:id', deleteTaskHandler);

module.exports = router;
