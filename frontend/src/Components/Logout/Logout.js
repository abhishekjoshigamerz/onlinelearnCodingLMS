import {react , useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {logOut} from '../../features/auth/authSlice';
import {useNavigate} from 'react-router-dom';

 export const Logout=() => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
   
    useEffect(() => {
        dispatch(logOut());

        navigate('/');

    }, [dispatch]);
    
    
    

  return (
    <div> Logout </div>
  )
}

export default Logout;
