import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {useIsAuthenticated, useSignOut} from 'react-auth-kit';
import './Header.css';

const Header = () => {
  const isAuthenticated = useIsAuthenticated();
  const navigation = useNavigate();
  const signOut = useSignOut();
  

  return (
    <header className="header">
      <h1 className="header-title"><NavLink to="/" className="siteTitle"> Site Title </NavLink></h1>
      {isAuthenticated() ? (
  <div className="header-buttons">
    
    <NavLink to="/practice-ide" className="header-button">Practice IDE</NavLink>
    <NavLink to="/settings" className="header-button">Settings</NavLink>
    <button  className="header-button" onClick={()=>signOut()}>Log out</button>
  </div>
) : (
  <div className="header-buttons">

    <NavLink to="/about" className="header-button">About Us</NavLink>
    <NavLink to="/login" className="header-button">Login</NavLink>
    <NavLink to="/register" className="header-button">Sign Up</NavLink>
  </div>
)}

    </header>
  );
}

export default Header;
