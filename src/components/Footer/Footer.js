import React from 'react';
import './Footer.css';
import { NavLink } from 'react-router-dom';
const Footer = () => {
  return (
    <footer className="footer">
      <h2 className="footer-title">Site Title</h2>
      <div className="footer-links">
        <NavLink to="/about"  className="footer-link">About Us</NavLink>
        <NavLink to="/contact" className="footer-link">Contact Us</NavLink>
      </div>
    </footer>
  );
}

export default Footer;
