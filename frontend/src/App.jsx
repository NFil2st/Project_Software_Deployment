import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import CurrencyConverter from './components/CurrencyConverter';
import AddTransaction from './components/AddTransaction';
import './App.css';

// Navigation wrapper component that uses React Router
function AppContent({ isAuthenticated, user, onLogin, onLogout }) {
  const navigate = useNavigate();
  const location = useLocation();
  
  const handleNavigate = (page) => {
    switch(page) {
      case 'dashboard':
        navigate('/dashboard');
        break;
      case 'add-transaction':
        navigate('/add-transaction');
        break;
      case 'currency':
        navigate('/currency');
        break;
      default:
        navigate('/dashboard');
    }
  };

  const getCurrentPage = () => {
    const path = location.pathname;
    if (path === '/dashboard') return 'dashboard';
    if (path === '/add-transaction') return 'add-transaction';
    if (path === '/currency') return 'currency';
    return 'dashboard';
  };

  return (
    <Routes>
      <Route 
        path="/login" 
        element={
          isAuthenticated ? 
            <Navigate to="/dashboard" replace /> : 
            <Login onLogin={onLogin} />
        } 
      />
      <Route 
        path="/dashboard" 
        element={
          isAuthenticated ? 
            <Dashboard 
              onLogout={onLogout} 
              onNavigate={handleNavigate}
              currentPage={getCurrentPage()}
              user={user}
            /> : 
            <Navigate to="/login" replace />
        } 
      />
      <Route 
        path="/add-transaction" 
        element={
          isAuthenticated ? 
            <AddTransaction 
              onNavigate={handleNavigate}
              onLogout={onLogout}
              currentPage={getCurrentPage()}
              user={user}
            /> : 
            <Navigate to="/login" replace />
        } 
      />
      <Route 
        path="/currency" 
        element={
          isAuthenticated ? 
            <CurrencyConverter 
              onNavigate={handleNavigate}
              onLogout={onLogout}
              currentPage={getCurrentPage()}
              user={user}
            /> : 
            <Navigate to="/login" replace />
        } 
      />
      <Route 
        path="/" 
        element={
          isAuthenticated ? 
            <Navigate to="/dashboard" replace /> : 
            <Navigate to="/login" replace />
        } 
      />
    </Routes>
  );
}

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check if user is already logged in
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    
    if (token && userData) {
      setIsAuthenticated(true);
      setUser(JSON.parse(userData));
    }
    setLoading(false);
  }, []);

  const handleLogin = (token, userData) => {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(userData));
    setIsAuthenticated(true);
    setUser(userData);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsAuthenticated(false);
    setUser(null);
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <Router>
      <div className="App">
        <AppContent 
          isAuthenticated={isAuthenticated}
          user={user}
          onLogin={handleLogin}
          onLogout={handleLogout}
        />
      </div>
    </Router>
  );
}

export default App;