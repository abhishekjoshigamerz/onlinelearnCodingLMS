import {react, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';

import { useFetchUsersQuery } from '../../features/users/usersSlice';
import { useFetchCourseByIdQuery } from '../../features/course/coursesSlice';
import { setUserData } from '../../features/users/userStore';
const UserCourses = () => {

   const userEmail = useSelector(state => state.auth.user);
   const dispatch = useDispatch(); 
    
     
 
    //get user data for enrolled courses now
  const { data, error, isLoading } = useFetchUsersQuery(userEmail);
  
    useEffect(() => {
    if(data){
        dispatch(setUserData(data));
    }
        
    }, [data,dispatch]);
  
  if (isLoading) return <div>Loading...</div>

  if (error) return <div>{error}</div>
   
  const courses = data.enrolledCourses;
    console.log(data);

  

    return (
        <div className="row">
            {courses.map((course, index) => (
                <div className="col-md-4" key={index}>
                    <div className="card" style={{ width: '18rem' }}>
                        <img src={'https://placehold.co/400'} className="card-img-top" alt={course.name} />
                        <div className="card-body">
                            <h5 className="card-title">{course.name}</h5>
                            <NavLink to={`/course/${course._id}/topic/${course.topics[0]}`} className="btn btn-primary">Continue Learning</NavLink>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default UserCourses;


