// Footer.js
import React from 'react';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer-div bg-dark text-light d-flex justify-content-center align-items-center">
            <p>© {new Date().getFullYear()} Code Master</p>
        </footer>
    );
}

export default Footer;
