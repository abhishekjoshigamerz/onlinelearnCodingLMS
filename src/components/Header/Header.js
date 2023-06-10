import React from 'react';
import './Header.css';
const Header = () => {
  return (
    <header className="header">
      <h1 className="header-title">Site Title</h1>
      <div className="header-buttons">
        <a className="header-button">About Us</a>
        <a className="header-button">Login</a>
        <a className="header-button">Sign Up</a>
      </div>
    </header>
  );
}

export default Header;
