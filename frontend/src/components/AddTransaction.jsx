import React, { useState } from 'react';
import { FaLightbulb } from 'react-icons/fa';
import api from '../services/api.js';
import Navbar from './Navbar.jsx';
import '../App.css';

const AddTransaction = ({ onBack, onNavigate, onLogout, user, currentPage }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    amount: '',
    type: 'expense',
    category: ''
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const categories = [
    'Food & Dining',
    'Transportation',
    'Shopping',
    'Entertainment',
    'Bills & Utilities',
    'Healthcare',
    'Education',
    'Travel',
    'Salary',
    'Freelance',
    'Investment',
    'Other'
  ];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    // Clear message when form changes
    if (message) setMessage('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.title || !formData.amount) {
      setMessage('Please fill in title and amount');
      return;
    }

    setLoading(true);
    setMessage('');

    try {
      const taskData = {
        ...formData,
        amount: parseFloat(formData.amount)
      };

      const response = await api.createTask(taskData);
      
      if (response.message) {
        setMessage('Transaction added successfully!');
        // Reset form
        setFormData({
          title: '',
          description: '',
          amount: '',
          type: 'expense',
          category: ''
        });
      } else {
        setMessage('Failed to add transaction. Please try again.');
      }
    } catch (err) {
      console.error('Add transaction error:', err);
      setMessage('Failed to add transaction. Please check your input.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-transaction-container">
      {/* Navigation Bar */}
      <Navbar 
        currentPage={currentPage}
        onNavigate={onNavigate}
        onLogout={onLogout}
        user={user}
      />

      {/* Main Content */}
      <div className="container">
        <div className="add-transaction-card">
          <div className="card-header">
            <h2>Transaction Details</h2>
            <p>Fill in the details below to add a new transaction</p>
          </div>

          {message && (
            <div className={`message ${message.includes('successfully') ? 'success' : 'error'}`}>
              {message}
            </div>
          )}

          <form onSubmit={handleSubmit} className="transaction-form">
            <div className="form-row">
              <div className="form-group">
                <label>Title *</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="e.g., Coffee at Starbucks"
                  required
                />
              </div>

              <div className="form-group">
                <label>Amount *</label>
                <input
                  type="number"
                  name="amount"
                  value={formData.amount}
                  onChange={handleChange}
                  step="0.01"
                  placeholder="0.00"
                  required
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Type</label>
                <select name="type" value={formData.type} onChange={handleChange}>
                  <option value="income">Income</option>
                  <option value="expense">Expense</option>
                </select>
              </div>

              <div className="form-group">
                <label>Category</label>
                <select name="category" value={formData.category} onChange={handleChange}>
                  <option value="">Select Category</option>
                  {categories.map(category => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="form-group">
              <label>Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="4"
                placeholder="Additional details about this transaction..."
              />
            </div>

            <div className="form-actions">
              <button 
                type="submit" 
                className="btn-primary add-transaction-btn"
                disabled={loading}
              >
                {loading ? 'Adding Transaction...' : 'Add Transaction'}
              </button>
              <button 
                type="button" 
                onClick={() => setFormData({
                  title: '',
                  description: '',
                  amount: '',
                  type: 'expense',
                  category: ''
                })}
                className="btn-secondary"
              >
                Clear Form
              </button>
            </div>
          </form>

          {/* Quick Tips */}
          <div className="quick-tips">
            <h3><FaLightbulb className="tips-icon" /> Quick Tips</h3>
            <ul>
              <li>Use descriptive titles for better tracking</li>
              <li>Add categories to organize your transactions</li>
              <li>Include descriptions for important transactions</li>
              <li>Use negative amounts for expenses, positive for income</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddTransaction;
