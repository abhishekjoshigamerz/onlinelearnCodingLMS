import React, { useState } from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import './Register.css';
function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [notificationMessage,setNotificationMessage] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
   
    // Add a basic check to see if passwords match
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }else{

      const registerUser = await  axios.post('http://localhost:5000/api/users/register',{
        fullname: username,
        email: email,
        password: password

      });

      if(registerUser.status === 200){
        //write me code to show a success message in div
        setNotificationMessage("User registered successfully, Now go to login page to login");
        navigate('/login');
      }else{
        setNotificationMessage("User registration failed, please try again");  
      }

    }

    // Here you would typically handle registration, e.g., send a request to your server
    console.log("Username:", username);
    console.log("Email:", email);
    console.log("Password:", password);
  };

  return (
    <>
    <Header />
    <div className='register-container'>
      <p className='alert-message'>{notificationMessage}</p>
    <form className='register-form' onSubmit={handleSubmit}>
      <div>
        <label>Full Name:</label>
        <input
          type="text"
          value={username}
          onChange={e => setUsername(e.target.value)}
        />
      </div>
      <div>
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
      </div>
      <div>
        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
      </div>
      <div>
        <label>Confirm Password:</label>
        <input
          type="password"
          value={confirmPassword}
          onChange={e => setConfirmPassword(e.target.value)}
        />
      </div>
      <div>
        <button type="submit">Register</button>
      </div>
    </form>
    </div>
    <Footer />
    </>
  );
}

export default Register;
