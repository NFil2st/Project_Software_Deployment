const express = require('express');
const router = express.Router();
const { createTaskHandler, getTasksHandler, updateTaskHandler } = require('../controllers/taskController');
const { 
    sumTransactionsHandler, 
    convertCurrencyHandler 
} = require('../controllers/transactionController');
const { deleteTaskController } = require('../controllers/deleteController');

router.get('/tasks', getTasksHandler);

// --- Spec C	Create record ---
router.post('/tasks', createTaskHandler);

// --- Spec D	Summary ---
router.post('/sum', sumTransactionsHandler); 

// --- Spec E	Update ---
router.put('/tasks/:id', updateTaskHandler);

// --- Spec F	Delete ---
router.delete('/tasks/:id', deleteTaskController);

// --- Spec G	Currency conversion ---
router.post('/currency/convert', convertCurrencyHandler);

module.exports = router;
