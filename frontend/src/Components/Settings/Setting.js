import {react,useState} from 'react';
import axios from 'axios';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import {useAuthHeader, useAuthUser} from 'react-auth-kit';
import './setting.css';
const Setting = () => {

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const useHeader = useAuthHeader();
   
    const email = useAuthUser();
    
    const token = useHeader();
    
    const handleSubmit = async(evt) => {
        evt.preventDefault();

        if(password !== confirmPassword){
            alert("Passwords do not match");
            return;
        }
        
        const url = "http://localhost:5000/api/users/change-password";
        //url is http://localhost:5000/api/users/change-password 
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': token    
            // more headers data
          };

        const data = {
            email: email().email,
            password: password
        }  

        let response = await axios.post(url, data, {headers});

        if(response.status == 204){
            alert("Password changed successfully");
        }else{
            alert("Password change failed");
        }


    }
    return (
        <>
        <Header />
        <div className='container'>
            <h1 className='textCenter'>Setting</h1>
            
            <form onSubmit={handleSubmit}>
                <div>
            <label>
                New Password:
            </label>
                <input 
                    type="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                />
          
            </div>
            <div>
            <label>
                Confirm New Password:
            </label>
                <input 
                    type="password"
                    value={confirmPassword}
                    onChange={e => setConfirmPassword(e.target.value)}
                />
            
            </div>
            
            <input type="submit" value="Change Password" />
        </form>
            
        </div>
        <Footer />
        </>
    )
}

export default Setting;