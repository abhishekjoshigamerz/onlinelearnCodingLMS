import {react,useEffect,useState} from 'react';
import {useParams} from 'react-router-dom';
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import './VerifyEmail.css';
import axios from 'axios';
const VerifyEmail = () => {
    const [verified,setVerified] = useState(false);
    const id = useParams();
    useEffect(() => {
        const verifyUser = async () => {
            let userId = id.id;
            let response = await axios.get(`http://localhost:5000/api/users/verify-email/${userId}`);
            if(response.status == 204){
                console.log('verified');
                setVerified(true);
            }else{
                console.log(response);
                console.log('not verified');
            }
        }

        verifyUser();
        
    }, [id]);
    return (
        <>
            <Header />
                <div className='containerVerify'>
                {
                    verified ? <h4>Thank you ! Your Email has been verified ! </h4> : <h4>Sorry ! Your Email could not be verified ! </h4>
                }    
                
                </div>
            <Footer />
        </>
    )

}

export default VerifyEmail;