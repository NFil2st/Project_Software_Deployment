import React from 'react';
import { 
  FaChartBar, 
  FaPlus, 
  FaExchangeAlt, 
  FaWallet, 
  FaSignOutAlt 
} from 'react-icons/fa';
import '../App.css';

const Navbar = ({ currentPage, onNavigate, onLogout, user }) => {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: FaChartBar },
    { id: 'add-transaction', label: 'Add Transaction', icon: FaPlus },
    { id: 'currency', label: 'Currency Converter', icon: FaExchangeAlt }
  ];

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo/Brand */}
        <div className="navbar-brand">
          <FaWallet className="brand-icon" />
          <span className="brand-text">ระบบรายรับ-รายจ่าย</span>
        </div>

        {/* Navigation Items */}
        <div className="navbar-nav">
          {navItems.map(item => {
            const IconComponent = item.icon;
            return (
              <button
                key={item.id}
                className={`nav-item ${currentPage === item.id ? 'active' : ''}`}
                onClick={() => onNavigate(item.id)}
              >
                <IconComponent className="nav-icon" />
                <span className="nav-label">{item.label}</span>
              </button>
            );
          })}
        </div>

        {/* User Info & Logout */}
        <div className="navbar-user">
          <div className="user-info">
            <span className="user-name">Welcome, {user?.name || 'User'}</span>
          </div>
          <button onClick={onLogout} className="logout-btn">
            <FaSignOutAlt className="logout-icon" />
            <span className="logout-text">Logout</span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
