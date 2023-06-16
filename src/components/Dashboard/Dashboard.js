import React from 'react';
import {useAuthUser} from 'react-auth-kit';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Courses from '../Courses/Courses';
const Dashboard = () => {
  const auth = useAuthUser();
  
  return (
    <>
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
