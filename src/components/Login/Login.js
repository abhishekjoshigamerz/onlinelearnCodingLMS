import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';



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
