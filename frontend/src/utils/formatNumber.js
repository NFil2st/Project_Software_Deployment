/**
 * Format number with commas for thousands separator
 * @param {number} num - The number to format
 * @param {number} decimals - Number of decimal places (default: 2)
 * @returns {string} Formatted number with commas
 */
export const formatNumber = (num, decimals = 2) => {
  if (num === null || num === undefined || isNaN(num)) {
    return '0.00';
  }
  
  const number = Number(num);
  const fixed = number.toFixed(decimals);
  const parts = fixed.split('.');
  
  // Add commas to integer part
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  
  return parts.join('.');
};

/**
 * Format currency with symbol and commas
 * @param {number} amount - The amount to format
 * @param {string} symbol - Currency symbol (default: '฿')
 * @param {number} decimals - Number of decimal places (default: 2)
 * @returns {string} Formatted currency string
 */
export const formatCurrency = (amount, symbol = '฿', decimals = 2) => {
  return `${symbol}${formatNumber(amount, decimals)}`;
};

