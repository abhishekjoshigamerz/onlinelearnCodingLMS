import React from 'react';
import logo from './logo.svg';
import Home from './Components/Home/Home';
import Layout from './Components/Layout';
import Login from './Components/Login/Login';
import Register from './Components/Register/Register';
import Dashboard from './Components/Dashboard/Dashboard';
import Topic from './Components/Topic/Topic';
import Course from './Components/Course/Course';
import { Routes, Route } from 'react-router-dom';
import RequireAuth from './features/auth/RequireAuth';
import ViewCourse from './Components/ViewCourse/ViewCourse';
import { DashboardCourses } from './Components/DashboardCourses/DashboardCourses';
import PracticeIDE from './Components/PracticeIDE/PracticeIDE';
import MonacoTesting from './Components/AceTesting/AceTesting';
import Settings from './Components/Settings/Settings';
import EmailVerification from './Components/EmailVerification/EmailVerification';
import Logout from './Components/Logout/Logout';
import Cart from './Components/Cart/Cart';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import ForgetPassword from './Components/ForgetPassword/ForgetPassword';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_KEY); // replace 'your_public_key' with your actual Stripe public key


const App = () => {

  return (
    <Elements stripe={stripePromise}>
       <ToastContainer autoClose={3000} hideProgressBar />
      {/* <Home /> */}
      <Routes>
        <Route path="/" element={<Layout />} />
        <Route index element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/course/:id' element={<ViewCourse />} />
        <Route path='/practice-ide' element={<MonacoTesting />} />
        <Route path='/users/verify-email/:id' element={<EmailVerification />} />
        <Route path='/forgot-password' element={<ForgetPassword />} />
        <Route path='/logout' element={<Logout />} />
        
        {/* requires authentication */}
        <Route element={<RequireAuth />}>
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/course/:courseId/topic/:topicId' element={<Topic />} />
          <Route path='/dashboard/courses' element={<DashboardCourses />} />
          
          <Route path='/settings' element={<Settings />} />
          <Route path='/cart' element={<Cart />} />
        </Route>
      </Routes>
    </Elements>
  );
}

export default App;
