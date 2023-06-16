import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import { useSignIn } from 'react-auth-kit'


//styles and page components
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import './Login.css';

//redux state management actions


function Login() {
  const [email, setemail] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState('');
  const navigate = useNavigate();
  const signIn = useSignIn();
 


  const handleSubmit = async (e) => {
    
    e.preventDefault();

    // Here you would typically handle login, e.g., send a request to your server


    console.log("email:", email);
    console.log("Password:", password);
    const response = await axios.post('http://localhost:5000/api/users/login',{
      email: email,
      password: password
    });

    if(response.data.accessToken){
      console.log("response.data.accessToken:", response.data.accessToken);
      const accessToken = response.data.accessToken;
      signIn({
        token: accessToken,
        expiresIn: 60 * 30,
        tokenType: 'Bearer',
        authState: { email: email },
        refreshToken: response.data.refreshToken,
        refreshTokenExpireIn: 60 * 60 * 24 * 2,

      });      
      navigate('/dashboard'); 
    }else{
      console.log("Failure to authenticate");
    }
  };

  return (
    <>
    <Header />
    <div className='login-container'>
    <form className='login-form' onSubmit={handleSubmit}>
      <div>
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={e => setemail(e.target.value)}
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
        <button type="submit">Login</button>
      </div>
     
    </form>
    </div>
    <Footer />
    </>
  );
}

export default Login;
