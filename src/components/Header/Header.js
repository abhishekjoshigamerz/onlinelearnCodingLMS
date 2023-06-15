import React from 'react';
import { NavLink } from 'react-router-dom';

import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <h1 className="header-title"><NavLink to="/" className="siteTitle"> Site Title </NavLink></h1>
      <div className="header-buttons">
        <NavLink to="/about" className="header-button">About Us</NavLink>
        <NavLink to="/login" className="header-button">Login</NavLink>
        <NavLink to="/register" className="header-button">Sign Up</NavLink>
      </div>
    </header>
  );
}

export default Header;
