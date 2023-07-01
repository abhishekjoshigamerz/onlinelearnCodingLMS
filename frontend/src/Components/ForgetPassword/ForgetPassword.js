import React, { useState } from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import {useChangePasswordEmailMutation} from '../../features/users/usersSlice';

const ForgetPassword = () => {
  const [email, setEmail] = useState('');
  const [message,setMessage] = useState(null);
  
  const [changePasswordEmail, {data, isLoading, isError, isSuccess}] = useChangePasswordEmailMutation();
  
  const handleSubmit = async (event) => {
    event.preventDefault();
    // Here you can call your API to send a password reset link to the user's email
    setMessage('If the email account you mentioned exists you need to check your email for a reset password');

    // now use the RTK query to send the email to the server and get the response
    const response = await changePasswordEmail({email});

    
    console.log('Password reset link has been sent to:', email);
  }

  return (
    <>
    <Header />
    <div className='container mt-5 d-flex justify-content-center'>

      <div className="card shadow p-4 mt-5" style={{ width: "30rem" }}>
        <h2 className="text-center">Forget Password</h2>
        {!message ?
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email:</label>
            <input 
              type="email" 
              id="email" 
              name="email" 
              value={email} 
              onChange={e => setEmail(e.target.value)} 
              required
              className="form-control"
            />
          </div>
          <div className="d-grid gap-2">
            <button type="submit" className="btn btn-primary">Submit</button>
          </div>
        </form>
        : <p>{message}</p>
        }
      </div>

    </div>
    <Footer />
    </>
  );
}

export default ForgetPassword;
