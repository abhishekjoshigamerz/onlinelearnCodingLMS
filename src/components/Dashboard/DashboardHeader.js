import React from 'react'
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
export const DashboardHeader = () => {

  const cart = useSelector((state) => state.cart.cart);
  let itemsNumber = Object.keys(cart).length;
  return (
    <>
      <nav class="navbar navbar-light bg-dark " style={{zIndex:10 }}>
        <div class="container-fluid">
          <NavLink class="navbar-brand bg-dark px-5 text-light"to={'/'} > CodeMaster </NavLink>
          <form class="d-flex">
            <NavLink className="nav-link px-3 text-light" to={'/cart'}>Cart {itemsNumber!=0 ? <span className="cart-badge">{itemsNumber}</span> : ''}</NavLink>
            <NavLink className="nav-link px-3 text-light" to={'/logout'}>Sign out</NavLink>
           
          </form>
        </div>
      </nav>

    </>
  )
}

export default DashboardHeader;
