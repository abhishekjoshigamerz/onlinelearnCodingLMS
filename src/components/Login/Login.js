import React, { useState } from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import './Login.css';
function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Here you would typically handle login, e.g., send a request to your server
    console.log("Username:", username);
    console.log("Password:", password);
  };

  return (
    <>
    <Header />
    <div className='login-container'>
    <form className='login-form' onSubmit={handleSubmit}>
      <div>
        <label>Username:</label>
        <input
          type="text"
          value={username}
          onChange={e => setUsername(e.target.value)}
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
