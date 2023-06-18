import {React,useState,useEffect} from 'react';
import {useAuthUser} from 'react-auth-kit';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Courses from '../Courses/Courses';
import axios from 'axios';

import './Dashboard.css';
const Dashboard = () => {
  const auth = useAuthUser();
  const [emailIsNotVerified,setEmailIsNotVerified] = useState(null);
  const [userId,setUserId] = useState(null);
  const user = useAuthUser();

  const handleEmailVerify = async (e) => {
    e.preventDefault();

    console.log('Button has been clicked!');
    const request = await axios.get(`http://localhost:5000/api/users/send-verification-email/${userId}`); 

    if(request.status == 204){
      setEmailIsNotVerified('Email has been sent!');
      
    }else{
      
    }  

  }
  
  useEffect(() => {

    const fetchUserDetail = async () => {
      let email = user().email;

      let response = await axios.get(`http://localhost:5000/api/users/get-data/${email}`);
      if(response.status == 200){
        setUserId(response.data._id);
        
        if(!response.data.emailVerified){
          setEmailIsNotVerified(true);
          
        }
      }else{
        console.log('Error in fetching user data');
      }

    }

    fetchUserDetail();

  },[]);
  return (
    <>
     {emailIsNotVerified && 
     <div className='mainHeader'>
        <div className="email-verified-banner">
          Your need to verify your email! &nbsp;
          <button className='btn btn-warning' onClick={handleEmailVerify}> Resend mail</button><br />
          <p>{emailIsNotVerified}</p>
        </div>
      </div>
      }
    <Header />
   
    <div className='courses'>
      <h1>Dashboard</h1>
      <h2>Enrolled Courses : </h2>
      No course enrolled till now !
    </div>
    <Courses />
    <Footer />
    </>
  );
};

export default Dashboard;
