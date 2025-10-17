import React, { useState } from 'react';
import { FaArrowRight, FaExchangeAlt } from 'react-icons/fa';
import api from '../services/api.js';
import Navbar from './Navbar.jsx';
import { formatNumber } from '../utils/formatNumber.js';
import '../App.css';

const CurrencyConverter = ({ onBack, onNavigate, onLogout, user, currentPage }) => {
  const [formData, setFormData] = useState({
    amount: '',
    from: 'USD',
    to: 'THB',
    title: '',
    description: '',
    type: 'expense'
  });
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const currencies = [
    { code: 'USD', name: 'US Dollar' },
    { code: 'THB', name: 'Thai Baht' },
    { code: 'EUR', name: 'Euro' }
  ];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    // Clear result when form changes
    if (result) setResult(null);
  };

  const handleConvert = async (e) => {
    e.preventDefault();
    
    if (!formData.amount || !formData.title) {
      setError('Please fill in amount and title');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const taskData = {
        amount: parseFloat(formData.amount),
        title: formData.title,
        description: formData.description,
        type: formData.type
      };

      const response = await api.convertCurrency(formData.from, formData.to, taskData);
      
      if (response.message && response.data) {
        setResult(response.data);
      } else {
        setError('Conversion failed. Please try again.');
      }
    } catch (err) {
      console.error('Currency conversion error:', err);
      setError('Conversion failed. Please check your input.');
    } finally {
      setLoading(false);
    }
  };

  const handleAddToTasks = async () => {
    if (!result) return;

    try {
      setLoading(true);
      await api.createTask({
        title: result.title,
        description: result.description,
        amount: result.amount,
        type: result.type,
        category: 'Currency Converted'
      });
      alert('Transaction added successfully!');
      setResult(null);
      setFormData({
        amount: '',
        from: 'USD',
        to: 'THB',
        title: '',
        description: '',
        type: 'expense'
      });
    } catch (err) {
      console.error('Add to tasks error:', err);
      alert('Failed to add transaction. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="currency-converter-container">
      {/* Navigation Bar */}
      <Navbar 
        currentPage={currentPage}
        onNavigate={onNavigate}
        onLogout={onLogout}
        user={user}
      />

      {/* Main Content */}
      <div className="container">
        <div className="currency-grid">
          {/* Left Column - Conversion Form */}
          <div className="conversion-form-card">
            <h2>Convert Currency</h2>
            
            <form onSubmit={handleConvert} className="currency-form">
              <div className="form-group">
                <label>Amount *</label>
                <input
                  type="number"
                  name="amount"
                  value={formData.amount}
                  onChange={handleChange}
                  step="0.01"
                  placeholder="100.00"
                  required
                />
              </div>

              <div className="currency-selection-row">
                <div className="form-group">
                  <label>From Currency *</label>
                  <select name="from" value={formData.from} onChange={handleChange} required>
                    {currencies.map(currency => (
                      <option key={currency.code} value={currency.code}>
                        {currency.code} - {currency.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="currency-arrow">
                  <FaExchangeAlt className="arrow-icon" />
                </div>

                <div className="form-group">
                  <label>To Currency *</label>
                  <select name="to" value={formData.to} onChange={handleChange} required>
                    {currencies.map(currency => (
                      <option key={currency.code} value={currency.code}>
                        {currency.code} - {currency.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label>Transaction Title *</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="e.g., Coffee Purchase"
                  required
                />
              </div>

              <div className="form-group">
                <label>Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows="3"
                  placeholder="Additional details..."
                />
              </div>

              <div className="form-group">
                <label>Transaction Type</label>
                <select name="type" value={formData.type} onChange={handleChange}>
                  <option value="income">Income</option>
                  <option value="expense">Expense</option>
                </select>
              </div>

              {error && (
                <div className="error-message">
                  {error}
                </div>
              )}

              <button 
                type="submit" 
                className="btn-primary convert-btn"
                disabled={loading}
              >
                {loading ? 'Converting...' : 'Convert Currency'}
              </button>
            </form>
          </div>

          {/* Right Column - Conversion Result */}
          <div className="conversion-result-card">
            <h2>Conversion Result</h2>
            
            {result ? (
              <div className="conversion-result">
                <div className="result-summary">
                  <div className="original-amount">
                    <span className="label">Original Amount:</span>
                    <span className="amount">
                      {formatNumber(result.originalAmount)} {result.originalCurrency}
                    </span>
                  </div>
                  
                  <div className="conversion-arrow">→</div>
                  
                  <div className="converted-amount">
                    <span className="label">Converted Amount:</span>
                    <span className="amount converted">
                      {formatNumber(result.amount)} {result.currency}
                    </span>
                  </div>
                </div>

                <div className="transaction-details">
                  <h3>Transaction Details</h3>
                  <div className="detail-item">
                    <span className="label">Title:</span>
                    <span className="value">{result.title}</span>
                  </div>
                  {result.description && (
                    <div className="detail-item">
                      <span className="label">Description:</span>
                      <span className="value">{result.description}</span>
                    </div>
                  )}
                  <div className="detail-item">
                    <span className="label">Type:</span>
                    <span className={`value type-${result.type}`}>
                      {result.type.charAt(0).toUpperCase() + result.type.slice(1)}
                    </span>
                  </div>
                </div>

                <div className="result-actions">
                  <button 
                    onClick={handleAddToTasks}
                    className="btn-primary add-to-tasks-btn"
                    disabled={loading}
                  >
                    {loading ? 'Adding...' : 'Add to Transactions'}
                  </button>
                  <button 
                    onClick={() => setResult(null)}
                    className="btn-secondary"
                  >
                    Clear Result
                  </button>
                </div>
              </div>
            ) : (
              <div className="no-result">
                <FaExchangeAlt className="no-result-icon" />
                <p>Enter amount and click "Convert Currency" to see the result</p>
              </div>
            )}

            {/* Exchange Rate Info */}
            <div className="exchange-rate-info">
              <h3>Exchange Rates</h3>
              <div className="rate-list">
                <div className="rate-item">
                  <span>1 USD = 36.50 THB</span>
                </div>
                <div className="rate-item">
                  <span>1 USD = 0.92 EUR</span>
                </div>
                <div className="rate-item">
                  <span>1 EUR = 39.67 THB</span>
                </div>
              </div>
              <p className="rate-note">
                * Rates are for demonstration purposes only
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurrencyConverter;
