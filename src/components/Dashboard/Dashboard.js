import React from 'react';
import './Dashboard.css';
import DashboardHeader from './DashboardHeader';
import { useSelector } from 'react-redux';
import Sidebar from './Sidebar';
import UserCourses from '../UserCourses/UserCourses';
import 'bootstrap/dist/css/bootstrap.min.css';
import Alert from 'react-bootstrap/Alert';
import axios from 'axios';


const Dashboard = () => {

  const user = useSelector(state => state.auth.user);
  const userID = useSelector(state => state.auth.id);
  
  console.log('User id is '+userID);
 
  const isEmailVerified = useSelector(state => state.auth.emailVerified);
  console.log(`Line 20 is ${isEmailVerified}`);
  const [emailIsNotVerified, setEmailIsNotVerified] = React.useState(null);
  const handleClick = async(e) => {

    e.preventDefault();
    alert('Email sent successfully!');  
    const request = await axios.get(`http://localhost:5000/api/users/send-verification-email/${userID}`); 
     if(request.status == 204){
      setEmailIsNotVerified('Email has been sent!'); 
    }
  }
    return (
        <>
  <DashboardHeader /> 

<div class="container-fluid">
  <div class="row">
   <Sidebar /> 

    <main class="col-md-9 ms-sm-auto col-lg-10 px-md-4 mt-5">
      
      {isEmailVerified ? null : 
         <Alert variant="warning">
      <Alert.Heading>Hey, You have not verified your email!</Alert.Heading>
      <p>
      {
        emailIsNotVerified ?  
        <p>{emailIsNotVerified}</p>
      : 
      <p>Please verify your email address to continue learning. You may like to check your spam folder as well. If you have not received the email, please click on the link below to resend the verification email.</p>  
      }
       
      </p>
      <hr />
      <p className="mb-0">
        <a href='#' onClick={handleClick}>Click here to resend verification email !</a>
      </p>
    </Alert>
      }

      <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <p class="h4">Enrolled Courses</p>

      </div>
      <UserCourses />
    </main>
  </div>
</div>

        </>
    );
}

export default Dashboard;
