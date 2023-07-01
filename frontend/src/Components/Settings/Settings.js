import {react, useState } from 'react';
import { useSelector } from 'react-redux';
import DashboardHeader from '../Dashboard/DashboardHeader';
import Sidebar from '../Dashboard/Sidebar';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { useChangePasswordMutation } from '../../features/users/usersSlice';
import RecentTransactions from './RecentTransactions';


export const Settings = () => {
  const user = useSelector(state => state.user.user);
  const token = useSelector(state=>state.auth.token);
  

  const userEmail = user.email;

  const [changeUserPassword, { isLoading, isError, error }] = useChangePasswordMutation();

  
  

  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');



  const changePassword = async(e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    try {
      console.log(userEmail,newPassword);
      await changeUserPassword({email: userEmail,password: newPassword,token: token });  
      alert('Password changed successfully');
    } catch (error) {
         console.error(error);
    }


  }

  
  return (
    <>
      <DashboardHeader />
      <div class="container-fluid">
  <div class="row">
    <Sidebar />
         <main class="col-md-9 ms-sm-auto col-lg-10 px-md-4 mt-5">
             <Tabs
      id="controlled-tab-example"
      
      
      className="mb-3"
    >
      <Tab eventKey="home" title="User">
        <p>Username: {user.fullname}</p>
        <p>User email: {user.email}</p>
        <p>Your role: {user.userRole==1 ? 'Student' : 'Teaching Assistant'}</p>
        <p>Enrolled Courses : {user.enrolledCourses.length}</p>

      </Tab>
      <Tab eventKey="password" title="Change Password">
        <form>
                  <div className="mb-3">
                    <label htmlFor="newPassword" className="form-label">New Password</label>
                    <input type="password" className="form-control" id="newPassword" onChange={(e)=>setNewPassword(e.target.value)}/>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="confirmPassword" className="form-label">Confirm New Password</label>
                    <input type="password" className="form-control" id="confirmPassword" onChange={(e)=>setConfirmPassword(e.target.value)} />
                  </div>
                  <button type="submit" className="btn btn-primary" onClick={changePassword}>Change Password</button>
        </form>
      </Tab>
        <Tab eventKey="recentTransactions" title="Recent Transactions">

         <RecentTransactions />
      </Tab>
    </Tabs>

         </main>
        
      </div>
  </div>

      

      
    </>
  )
}

export default Settings;
