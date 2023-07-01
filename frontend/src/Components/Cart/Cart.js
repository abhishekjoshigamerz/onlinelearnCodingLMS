
import React from 'react';
import { useSelector,useDispatch } from 'react-redux';
import { removeCartData } from '../../features/cart/cartStore';
import DashboardHeader from '../Dashboard/DashboardHeader';
import { NavLink, useNavigate } from 'react-router-dom';

import StripeCheckout from '../StripeCheckout/StripeCheckout';
import './Cart.css';
const Cart = () => {
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart.cart);
  const dispatch = useDispatch();
  const isCartEmpty = Object.keys(cart).length;
  const courseIds = Object.keys(cart);
  const cartItems = Object.values(cart);

  const totalPrice = cartItems.reduce((sum, item) => sum + item.coursePrice, 0);
  // let courseItems = [];
 
  const removeCourse = async(id)=>{
    console.log('Removing course');
    dispatch(removeCartData(id));
  }


  return (
    <div>
      <DashboardHeader />
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <h1 className='text-center mt-5'>Cart</h1>
            {cartItems.map((item, index) => (
              <div key={index} className="cart-item">
                <img src="https://placehold.co/400" alt={item.courseName} className="cart-item-image" />
                <div className="cart-item-info">
                  <h2>Name: {item.courseName}</h2>
                  <h3>Price: ${item.coursePrice}</h3>
                  <button className='btn btn-danger' onClick={() => removeCourse(item.id)}>Remove Course</button>
                </div>
              </div>
            ))}
            <div className="cart-total">
              <h2>Total Price: ${totalPrice}</h2>
            </div>
         
          </div>
          <div className='col-md-6'>
              <div className='mt-5'>
                {isCartEmpty!=0 ? 
                <StripeCheckout totalPrice={totalPrice} courseIds={courseIds}/>
                 :
                 <p>There are no courses in your Cart. Please add some courses and then you can proceed ahead!</p>
                 }
                </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart;
