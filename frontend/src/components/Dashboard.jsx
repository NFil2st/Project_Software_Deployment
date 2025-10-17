import React, { useState, useEffect } from 'react';
import { createTransactionForm } from './TransactionForm.js';
import { createTransactionList } from './TransactionList.js';
import { createSummary } from './Summary.js';
import Navbar from './Navbar.jsx';
import api from '../services/api.js';
import { formatNumber } from '../utils/formatNumber.js';
import './style.css';

const Dashboard = ({ onLogout, onNavigate, currentPage, user }) => {
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    // Get user info from localStorage
    const storedUserData = localStorage.getItem('user');
    if (storedUserData) {
      setUserData(JSON.parse(storedUserData));
    }
    
    // Load initial tasks
    loadTasks();
  }, []);

  const loadTasks = async () => {
    try {
      setLoading(true);
      const res = await api.getTasks();
      if (res && res.data) {
        setTasks(res.data);
      }
    } catch (err) {
      console.error('Load tasks error', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateTask = async (taskData) => {
    try {
      await api.createTask(taskData);
      setEditingTask(null);
      await loadTasks();
    } catch (err) {
      console.error('Create task error', err);
      alert('Failed to create task');
    }
  };

  const handleUpdateTask = async (id, taskData) => {
    try {
      await api.updateTask(id, taskData);
      setEditingTask(null);
      await loadTasks();
    } catch (err) {
      console.error('Update task error', err);
      alert('Failed to update task');
    }
  };

  const handleDeleteTask = async (id) => {
    if (!id) return alert('Invalid task ID');
    if (!confirm('Are you sure you want to delete this task?')) return;
    
    try {
      await api.deleteTask(id);
      await loadTasks();
    } catch (err) {
      console.error('Delete task error', err);
      alert('Failed to delete task');
    }
  };

  const handleEditTask = (task) => {
    setEditingTask(task);
    // Scroll to top so user sees form
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLogout = () => {
    if (confirm('Are you sure you want to logout?')) {
      onLogout();
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading dashboard...</p>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      {/* Navigation Bar */}
      <Navbar 
        currentPage={currentPage}
        onNavigate={onNavigate}
        onLogout={handleLogout}
        user={user}
      />

      {/* Main Content */}
      <div className="container">
        <div className="grid">
          {/* Left Column - Form + List */}
          <div className="left-column">
            {/* Transaction Form */}
            <div className="form-card">
              <h2>{editingTask ? 'Edit Transaction' : 'Add New Transaction'}</h2>
              <TransactionForm 
                task={editingTask}
                onSubmit={editingTask ? 
                  (data) => handleUpdateTask(editingTask._id, data) : 
                  handleCreateTask
                }
                onCancel={() => setEditingTask(null)}
              />
            </div>

            {/* Transaction List */}
            <div className="list-card">
              <h2>Transaction History</h2>
              <TransactionList 
                tasks={tasks}
                onEdit={handleEditTask}
                onDelete={handleDeleteTask}
              />
            </div>
          </div>

          {/* Right Column - Summary */}
          <div className="right-column">
            <div className="summary-card">
              <Summary tasks={tasks} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Transaction Form Component
const TransactionForm = ({ task, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    amount: '',
    type: 'expense',
    category: ''
  });

  useEffect(() => {
    if (task) {
      setFormData({
        title: task.title || '',
        description: task.description || '',
        amount: task.amount || '',
        type: task.type || 'expense',
        category: task.category || ''
      });
    }
  }, [task]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.title || !formData.amount) {
      alert('Please fill in required fields');
      return;
    }

    const taskData = {
      ...formData,
      amount: parseFloat(formData.amount)
    };

    onSubmit(taskData);
    
    // Reset form if creating new task
    if (!task) {
      setFormData({
        title: '',
        description: '',
        amount: '',
        type: 'expense',
        category: ''
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="transaction-form">
      <div className="form-group">
        <label>Title *</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
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
          required
        />
      </div>

      <div className="form-group">
        <label>Type</label>
        <select name="type" value={formData.type} onChange={handleChange}>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
      </div>

      <div className="form-group">
        <label>Category</label>
        <input
          type="text"
          name="category"
          value={formData.category}
          onChange={handleChange}
          placeholder="e.g., Food, Transport, Salary"
        />
      </div>

      <div className="form-actions">
        <button type="submit" className="btn-primary">
          {task ? 'Update Transaction' : 'Add Transaction'}
        </button>
        {task && (
          <button type="button" onClick={onCancel} className="btn-secondary">
            Cancel
          </button>
        )}
      </div>
    </form>
  );
};

// Transaction List Component
const TransactionList = ({ tasks, onEdit, onDelete }) => {
  if (tasks.length === 0) {
    return (
      <div className="empty-state">
        <p>No transactions yet. Add your first transaction above!</p>
      </div>
    );
  }

  return (
    <div className="transaction-list">
      {tasks.map((task) => (
        <div key={task._id} className={`transaction-item ${task.type}`}>
          <div className="transaction-info">
            <h3>{task.title}</h3>
            {task.description && <p>{task.description}</p>}
            {task.category && <span className="category">{task.category}</span>}
            <span className="date">
              {new Date(task.createdAt).toLocaleDateString()}
            </span>
          </div>
          <div className="transaction-amount">
            <span className={`amount ${task.type}`}>
              {task.type === 'expense' ? '-' : '+'}฿{formatNumber(Math.abs(task.amount))}
            </span>
          </div>
          <div className="transaction-actions">
            <button onClick={() => onEdit(task)} className="btn-edit">
              Edit
            </button>
            <button onClick={() => onDelete(task._id)} className="btn-delete">
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

// Summary Component
const Summary = ({ tasks }) => {
  const summary = tasks.reduce(
    (acc, task) => {
      if (task.type === 'income') {
        acc.totalIncome += task.amount;
      } else {
        acc.totalExpense += task.amount;
      }
      return acc;
    },
    { totalIncome: 0, totalExpense: 0 }
  );

  const balance = summary.totalIncome - summary.totalExpense;

  return (
    <div className="summary">
      <h2>Financial Summary</h2>
      <div className="summary-item">
        <span className="label">Total Income:</span>
        <span className="amount income">+฿{formatNumber(summary.totalIncome)}</span>
      </div>
      <div className="summary-item">
        <span className="label">Total Expense:</span>
        <span className="amount expense">-฿{formatNumber(summary.totalExpense)}</span>
      </div>
      <div className="summary-item total">
        <span className="label">Balance:</span>
        <span className={`amount ${balance >= 0 ? 'income' : 'expense'}`}>
          {balance >= 0 ? '+' : ''}฿{formatNumber(Math.abs(balance))}
        </span>
      </div>
    </div>
  );
};

export default Dashboard;
