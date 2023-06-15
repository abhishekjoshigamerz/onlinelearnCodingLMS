import React, { useState, useEffect } from 'react';
import './Courses.css';
import { databases } from '../../services/appwrite';
import { NavLink } from 'react-router-dom';
import axios from 'axios';

const Courses = () => {

  const [courses, setCourses] = useState(null);

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
            <NavLink to={'courses/'+course._id} className="courses-item-button">Enroll Now</NavLink>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Courses;
