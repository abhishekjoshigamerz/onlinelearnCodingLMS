import React from 'react'
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Navbar, Nav, Badge } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';  

const DashboardHeader = () => {
  const cart = useSelector((state) => state.cart.cart);
  let itemsNumber = Object.keys(cart).length;

  return (
    <Navbar expand="lg" bg="white" variant="white" style={{zIndex: 20, position: 'sticky', top: 0}}>
      <Navbar.Brand as={NavLink} to="/dashboard" className="text-dark">CodeMaster</Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav" className="justify-content-end">
        <Nav>
          <Nav.Link as={NavLink} to="/cart" className="text-black">
            Cart &nbsp;
            {itemsNumber !== 0 && 
              <Badge pill variant="text-black" className="ml-2 text-black">{itemsNumber}</Badge>}
          </Nav.Link>
          <Nav.Link as={NavLink} to="/logout" className="text-black">Sign out</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}

export default DashboardHeader;
