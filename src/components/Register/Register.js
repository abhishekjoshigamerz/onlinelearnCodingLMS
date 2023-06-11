import React, { useState } from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';


import './Register.css';
function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Add a basic check to see if passwords match
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
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
    <form className='register-form' onSubmit={handleSubmit}>
      <div>
        <label>Username:</label>
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
