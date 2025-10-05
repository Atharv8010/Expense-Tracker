import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import '../styles/Header.css';

const Header = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <header className="header">
      <div className="header-content">
        <div className="logo">
          <span  className="logo-icon">💰</span>
          <h1>Expense Tracker</h1>
        </div>
        {user && (
          <div className="user-section">
            <span className="user-name">Hi, {user.name}!</span>
            <button className="btn btn-logout" onClick={logout}>
              Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;