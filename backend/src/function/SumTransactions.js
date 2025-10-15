
function sumTransactions(transactions = []) {
  let totalIncome = 0;
  let totalExpense = 0;

  if (!Array.isArray(transactions)) {
    throw new TypeError('transactions must be an array');
  }

  for (const tx of transactions) {
    if (!tx || typeof tx.amount !== 'number') continue;

    if (tx.type === 'income') {
      totalIncome += tx.amount;
    } else if (tx.type === 'expense') {
      totalExpense += tx.amount;
    }
  }

  const balance = totalIncome - totalExpense;

  return { totalIncome, totalExpense, balance };
}

module.exports = { sumTransactions };  