import React from 'react';
import {NavLink} from 'react-router-dom';
import { useSelector } from 'react-redux';
import './Header.css';
export const Header = () => {
  const logoLight='';
  const logoDark='';
    const cart = useSelector((state) => state.cart.cart);
    
    let itemsNumber = Object.keys(cart).length;
    
    const user = useSelector((state) => state.auth.user);
   

  return (
    <div>
        <nav className="navbar navbar-expand-lg fixed-top navbar-custom sticky sticky-dark nav-sticky" id="nav-sticky">
            <div className="container-fluid">
               
                <a className="logo text-uppercase" href="#">
                    <img src={logoLight} alt="" className="logo-light" height="18" />
                    <img src={logoDark} alt="" className="logo-dark" height="18" />
                </a>

                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
                    <i className="mdi mdi-menu"></i>
                </button>
                {
                    !user ?  <div className="collapse navbar-collapse" id="navbarCollapse">
                    <ul className="navbar-nav ms-auto" id="mySidenav">
                        <li className="nav-item">
                            <a href="/" className="nav-link active">Home</a>
                        </li>
                        <li className="nav-item">
                            <a href="#about" className="nav-link">About us</a>
                        </li>
                       
                        <li className="nav-item">
                            <a href="#courses" className="nav-link">Courses</a>
                        </li>
                         <li className="nav-item">
                            <NavLink to={'/login'} className="nav-link">Login </NavLink>
                        </li>
                         <li className="nav-item">
                            <NavLink to={'/register'} className="nav-link">Register </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to={'/cart'} className="nav-link">Cart {itemsNumber!=0 ? <span className="cart-badge">{itemsNumber}</span> : ''} </NavLink>
                        </li>
                    </ul>
                </div>
                : <div className="collapse navbar-collapse" id="navbarCollapse">
                     <ul className="navbar-nav ms-auto" id="mySidenav">
                        <li className="nav-item">
                            <a href="/" className="nav-link active">Home</a>
                        </li>
                         <li className="nav-item">
                            <a href="/dashboard" className="nav-link ">Dashboard</a>
                        </li>
                        <li className="nav-item">
                            <a href="#about" className="nav-link">About us</a>
                        </li>
                       
                        <li className="nav-item">
                            <a href="#courses" className="nav-link">Courses</a>
                        </li>
                        
                        <li className="nav-item">
                            <NavLink to={'/cart'} className="nav-link">Cart {itemsNumber!=0 ? <span className="cart-badge">{itemsNumber}</span> : ''} </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to={'/logout'} className="nav-link"> Sign Out </NavLink>
                        </li>
                    </ul>
                  </div>
                }
            </div>
      </nav>
    </div>
  )
}

export default Header;