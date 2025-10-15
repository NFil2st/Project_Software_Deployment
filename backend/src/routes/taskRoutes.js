const express = require('express');
const router = express.Router();
const { createTaskHandler } = require('../controllers/taskController');
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

module.exports = router;
