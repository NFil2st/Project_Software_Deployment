const { sumTransactions } = require('../function/sumTransactions');
const { convertCurrency } = require('../function/convertCurrency');

exports.sumTransactionsHandler = (req, res) => {
  try {
    const transactions = req.body;
    const summary = sumTransactions(transactions);
    
    res.status(200).json({
      message: 'Transaction summary calculated successfully',
      data: summary,
    });
  } catch (error) {
    res.status(400).json({
      message: 'Invalid input data',
      error: error.message,
    });
  }
};

exports.convertCurrencyHandler = (req, res) => {
    try {
        const { from, to, taskData } = req.body;
        if (!from || !to || !taskData || !taskData.amount) {
             return res.status(400).json({ 
                 message: 'Missing currency conversion parameters (from, to, amount)', 
                 error: 'Required fields missing' 
            });
        }
        
        const convertedTask = convertCurrency(from, to, taskData);
        
        res.status(200).json({
            message: `Conversion successful from ${from} to ${to}`,
            data: convertedTask,
        });
    } catch (error) {
        res.status(400).json({
            message: 'Conversion failed',
            error: error.message,
        });
    }
};