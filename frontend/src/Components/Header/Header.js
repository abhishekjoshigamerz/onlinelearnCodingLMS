import React from 'react';
import { useSelector } from 'react-redux';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

export const Header = () => {
  const cart = useSelector((state) => state.cart.cart);

  let itemsNumber = Object.keys(cart).length;
  
  const user = useSelector((state) => state.auth.user);

  return (
    <Navbar expand="lg" variant="light" bg="light">
      <Container>
        <Navbar.Brand as={NavLink} to="/">CodeMaster</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            {!user ? (
              <>
                <Nav.Link as={NavLink} exact to="/">Home</Nav.Link>
                <Nav.Link href="#about">About Us</Nav.Link>
                <Nav.Link href="#courses">Courses</Nav.Link>
                <Nav.Link as={NavLink} to="/login">Login</Nav.Link>
                <Nav.Link as={NavLink} to="/register">Register</Nav.Link>
                <Nav.Link as={NavLink} to="/cart">Cart {itemsNumber !== 0 && <span className="cart-badge">{itemsNumber}</span>}</Nav.Link>
              </>
            ) : (
              <>
                <Nav.Link as={NavLink} exact to="/">Home</Nav.Link>
                <Nav.Link as={NavLink} to="/dashboard">Dashboard</Nav.Link>
                <Nav.Link href="#about">About Us</Nav.Link>
                <Nav.Link href="#courses">Courses</Nav.Link>
                <Nav.Link as={NavLink} to="/cart">Cart {itemsNumber !== 0 && <span className="cart-badge">{itemsNumber}</span>}</Nav.Link>
                <Nav.Link as={NavLink} to="/logout">Sign Out</Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
