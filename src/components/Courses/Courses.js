import React, { useState, useEffect } from 'react';

import { databases } from '../../services/appwrite';
import { NavLink,useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuthUser } from 'react-auth-kit';

import './Courses.css';
const Courses = () => {
  const navigate = useNavigate();
  const [courses, setCourses] = useState(null);
  const user = useAuthUser();
  //enrolls user in course
  const handleEnrollment = async (event,id) => {
    event.preventDefault();
    
    const data = {
      courseId: id,
      email : user().email
    }

    console.log(data);
    const request = await axios.post(`http://localhost:5000/api/courses/enroll/`,data);

    if (request.status == 204) {
    //redirect to course page 
    navigate(`/courses/${id}`);
    }else if(request.status == 200){
      navigate(`/courses/${id}`);
    } else {
      console.log('Error in enrolling user in course!');
    }
  }


  useEffect(() => {
    const getCourses = async () => {
      const response = await axios.get('http://localhost:5000/api/courses');
      console.log(response.data.courses);
      setCourses(response.data.courses);
    }
    getCourses();
  }, []);

  return (
    <div className="courses">
      <h2 className="courses-title">Available Courses</h2>
      <div className="courses-list">
        {courses && courses.map((course, index) => (
          <div key={index} className="courses-item">
            <img src={course.courseImage} alt={course.name} className="courses-item-image" />
            <h3 className="courses-item-title">{course.name}</h3>
            <p className="courses-item-desc">{course.description}</p>
            {/* <NavLink to={'/courses/'+course._id} className="courses-item-button">Enroll Now</NavLink> */}
            <button className="courses-item-button" onClick={(event)=>handleEnrollment(event,course._id)} >Enroll Now</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Courses;
