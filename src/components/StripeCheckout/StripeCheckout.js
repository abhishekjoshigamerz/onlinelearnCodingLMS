// StripeCheckout.js
import React from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useSelector,useDispatch } from 'react-redux';
import { clearCart } from '../../features/cart/cartStore';
import axios from 'axios';
import './StripeCheckout.css'; 
const StripeCheckout = ({totalPrice,courseIds}) => {
  
  const stripe = useStripe();
  const elements = useElements();
  const email =  useSelector((state) => state.auth.user);
  const user_id = useSelector((state) => state.auth.id);
  const name =  useSelector((state) => state.user.user.fullname);  
 



  const dispatch = useDispatch();
  const CARD_ELEMENT_OPTIONS = {
  style: {
    base: {
      color: "#32325d",
      fontFamily: 'Arial, sans-serif',
      fontSmoothing: "antialiased",
      fontSize: "16px",
      "::placeholder": {
        color: "#aab7c4"
      }
    },
    invalid: {
      color: "#fa755a",
      iconColor: "#fa755a"
    }
  }
};

const emptyCart = async(event)=>{
  event.preventDefault();

  dispatch(clearCart());

}


  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    const cardElement = elements.getElement(CardElement);

    const {error, paymentMethod} = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
    });

    if (error) {
      console.log('[error]', error);
     //   const {id} = paymentMethod.id;

    } else {

      try {
        console.log('[PaymentMethod]', paymentMethod);
        const {id} = paymentMethod;
        const {data} = await axios.post('http://localhost:5000/api/make-payment',{
            id: id,
            userId:user_id,
            userEmail: email,
            userName:  name,
            amount: totalPrice,
            courses:courseIds
        });

        const confirmedPayment = await stripe.confirmCardPayment(data.clientSecret, {
            payment_method: id
        });

        if (confirmedPayment) {
            console.log('Payment done successfully');
            //redirect user now 
        }else{
            console.log('Payment failed');
        }

      } catch (error) {
          console.log(error);
      }  
      

      // Here you can send the paymentMethod.id to your server and process the payment
      // Stripe will manage the card details and provide you with a unique id for this transaction

    }
  };

  return (
     <form onSubmit={handleSubmit} className="needs-validation">
        <h3>Checkout Cart </h3>
      <div className="form-group mt-5">
        <label htmlFor="card-element">
          Credit or debit card
        </label>
        <div className="input-group" id="card-element-container">
          <CardElement id="card-element" options={CARD_ELEMENT_OPTIONS} />
        </div>
      </div>
      <div className="form-group row mt-4">
        <div className="col-lg-12">
          <button type="submit" className="btn btn-primary btn-lg" disabled={!stripe}>
            Pay Now
          </button> &nbsp;
          <button type="button" className="btn btn-secondary btn-lg ml-2" onClick={emptyCart }>
            Clear Cart 
          </button>
        </div>
      </div>
    </form>


  
  );
};

export default StripeCheckout;


