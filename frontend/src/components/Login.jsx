import React, { useState } from 'react';
import './Login.css';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      console.log('Sending login request...', formData);
      
      const response = await fetch('http://localhost:3000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      console.log('Response status:', response.status);
      console.log('Response headers:', response.headers);

      const data = await response.json();
      console.log('Response data:', data);

      if (data.success) {
        setMessage(`Login successful! Welcome ${data.user.name}`);
        console.log('Login successful! Token:', data.token);
        console.log('User data:', data.user);
        
        // Store token in localStorage
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        
        // No alert popup - just console output
      } else {
        setMessage(`${data.message}`);
        console.log('Login failed:', data.message);
      }
    } catch (error) {
      setMessage(`Error: ${error.message}`);
      console.error('Login error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      {/* Left Section - Dashboard Preview */}
      <div className="dashboard-preview">
        <div className="logo-section">
          <div className="logo-circle">
            <span className="logo-letter">F</span>
          </div>
          <span className="logo-text">Financial Tracker</span>
        </div>

        <div className="welcome-section">
          <h1 className="welcome-title">Welcome back!</h1>
          <p className="welcome-subtitle">Start managing your finance faster and better</p>
        </div>

      </div>

      {/* Right Section - Login Form */}
      <div className="login-form-section">
        <div className="login-form-container">
          <h1 className="form-title">Welcome back!</h1>
          <p className="form-subtitle">Start managing your finance faster and better</p>

          {message && (
            <div className={`message ${message.includes('Login successful') ? 'success' : 'error'}`}>
              {message}
            </div>
          )}

          <form className="login-form" onSubmit={handleSubmit}>
            <div className="input-group">
              <div className="input-icon">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20 4H4C2.9 4 2.01 4.9 2.01 6L2 18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V6C22 4.9 21.1 4 20 4ZM20 8L12 13L4 8V6L12 11L20 6V8Z" fill="#9CA3AF"/>
                </svg>
              </div>
              <input 
                type="email" 
                name="email"
                placeholder="you@example.com" 
                className="form-input"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="input-group">
              <div className="input-icon">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M18 8H17V6C17 3.24 14.76 1 12 1S7 3.24 7 6V8H6C4.9 8 4 8.9 4 10V20C4 21.1 4.9 22 6 22H18C19.1 22 20 21.1 20 20V10C20 8.9 19.1 8 18 8ZM12 17C10.9 17 10 16.1 10 15S10.9 13 12 13S14 13.9 14 15S13.1 17 12 17ZM15.1 8H8.9V6C8.9 4.29 10.29 2.9 12 2.9S15.1 4.29 15.1 6V8Z" fill="#9CA3AF"/>
                </svg>
              </div>
              <input 
                type="password" 
                name="password"
                placeholder="enter your password" 
                className="form-input"
                value={formData.password}
                onChange={handleChange}
                required
              />
              <div className="password-toggle">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 4.5C7 4.5 2.73 7.61 1 12C2.73 16.39 7 19.5 12 19.5S21.27 16.39 23 12C21.27 7.61 17 4.5 12 4.5ZM12 17C9.24 17 7 14.76 7 12S9.24 7 12 7S17 9.24 17 12S14.76 17 12 17ZM12 9C10.34 9 9 10.34 9 12S10.34 15 12 15S15 13.66 15 12S13.66 9 12 9Z" fill="#9CA3AF"/>
                </svg>
              </div>
            </div>

            <div className="forgot-password">
              <a href="#" className="forgot-link">Forgot password?</a>
            </div>

            <button type="submit" className="login-button" disabled={loading}>
              {loading ? 'Logging in...' : 'Login'}
            </button>

            <div className="divider">
              <span className="divider-text">or</span>
            </div>

            <div className="social-login">
              <button className="social-button google-button">
                <span className="social-icon google-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M22.56 12.25C22.56 11.47 22.49 10.72 22.36 10H12V14.255H17.92C17.665 15.63 16.89 16.795 15.725 17.575V20.335H19.28C21.04 18.67 22.56 15.9 22.56 12.25Z" fill="#4285F4"/>
                    <path d="M12 23C15.24 23 17.955 21.935 19.28 20.335L15.725 17.575C14.735 18.235 13.48 18.625 12 18.625C8.87 18.625 6.23 16.585 5.405 13.71H1.765V16.535C3.095 19.24 7.31 23 12 23Z" fill="#34A853"/>
                    <path d="M5.405 13.71C5.205 13.07 5.09 12.395 5.09 11.7C5.09 11.005 5.205 10.33 5.405 9.69V6.865H1.765C1.035 8.315 0.64 9.93 0.64 11.7C0.64 13.47 1.035 15.085 1.765 16.535L5.405 13.71Z" fill="#FBBC05"/>
                    <path d="M12 4.375C13.615 4.375 15.065 4.93 16.205 6.02L19.36 2.865C17.95 1.54 15.24 0.5 12 0.5C7.31 0.5 3.095 4.26 1.765 6.865L5.405 9.69C6.23 6.815 8.87 4.375 12 4.375Z" fill="#EA4335"/>
                  </svg>
                </span>
                <span className="social-text">Google</span>
              </button>
              <button className="social-button facebook-button">
                <span className="social-icon facebook-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24V15.563H7.078V12.073H10.125V9.413C10.125 6.387 11.917 4.716 14.658 4.716C15.97 4.716 17.344 4.951 17.344 4.951V7.923H15.83C14.34 7.923 13.875 8.853 13.875 9.808V12.073H17.203L16.671 15.563H13.875V24C19.612 23.094 24 18.1 24 12.073Z" fill="#1877F2"/>
                  </svg>
                </span>
                <span className="social-text">Facebook</span>
              </button>
            </div>

            <div className="signup-link">
              <span className="signup-text">Don't you have an account? </span>
              <a href="#" className="signup-link-text">Sign Up</a>
            </div>
          </form>

          {/* <div className="copyright">
            © 2022 ALL RIGHTS RESERVED
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default Login;