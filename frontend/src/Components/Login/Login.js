import  { react,useState,useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { toast } from 'react-toastify'; 
import { setCredentials } from '../../features/auth/authSlice';
import { useLoginMutation } from '../../features/auth/authApiSlice';
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [login,isLoading] = useLoginMutation();
  
  
  const handleLogin = async(event) => {
    event.preventDefault();
    console.log(`Email: ${email}, Password: ${password}`);

    try {
        const userData = await login({email,password}).unwrap();
        console.log(userData);
        dispatch(setCredentials({...userData,email} ));
        navigate('/dashboard'); 
    } catch (error) {
        toast.error('Email/Password is incorrect'); 
    }

  };

  return (
    <div className="login-container d-flex justify-content-center align-items-center">
      <div className="card shadow-lg">
        <div className="card-body">
          <h2 className="card-title text-center">Login</h2>
          <form onSubmit={handleLogin} className="form-signin">
            <div className="form-group">
              <label htmlFor="inputEmail" className="sr-only">Email address</label>
              <input 
                type="email" 
                id="inputEmail" 
                className="form-control"
                placeholder="Email address"
                required autoFocus
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="inputPassword" className="sr-only">Password</label>
              <input 
                type="password" 
                id="inputPassword"
                className="form-control"
                placeholder="Password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <NavLink to="/forgot-password" className="forgot-password-link">Forgot Password?</NavLink><br />
            <button className="btn btn-lg btn-primary btn-block" onClick={handleLogin} type="submit">Sign in</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
