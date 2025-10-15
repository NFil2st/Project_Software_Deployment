const mockExchangeRates = {
    "USD": {
        "THB": 36.50, 
        "EUR": 0.92,  
        "USD": 1
    },
    "THB": {
        "USD": 0.0274, 
        "EUR": 0.0252, 
        "THB": 1
    },
    "EUR": {
        "USD": 1.08,  
        "THB": 39.67, 
        "EUR": 1
    }
};

function convertCurrency(from, to, taskData) {

    const rateMap = mockExchangeRates[from];
    if (!rateMap) {
        throw new Error(`Unsupported currency: ${from}`);
    }
    const rate = rateMap[to];
    if (!rate) {
        throw new Error(`Unsupported conversion from ${from} to ${to}`);
    }

    const originalAmount = taskData.amount;
    const convertedAmount = parseFloat((originalAmount * rate).toFixed(2));
    const convertedTask = {
        ...taskData,
        amount: convertedAmount,
        currency: to,
        originalAmount: originalAmount,
        originalCurrency: from
    };

    return convertedTask;
}

module.exports = convertCurrency;
convertCurrency.js