import React, { useState, useEffect } from 'react';
import './Courses.css';
import { databases } from '../../services/appwrite';
import { NavLink } from 'react-router-dom';
async function getCourses(){
  const response = await databases.listDocuments('64833e8413a93babd4b6', '648445e5a12e6ed3ebe8');
  return response.documents; 
}

const Courses = () => {

  const [courses, setCourses] = useState(null);

  useEffect(() => {
    getCourses().then(data => setCourses(data));
  }, []);

  return (
    <div className="courses">
      <h2 className="courses-title">Available Courses</h2>
      <div className="courses-list">
        {courses && courses.map((course, index) => (
          <div key={index} className="courses-item">
            <img src={course.courseImage} alt={course.courseTitle} className="courses-item-image" />
            <h3 className="courses-item-title">{course.courseTitle}</h3>
            <p className="courses-item-desc">{course.courseDescription}</p>
            <NavLink to={'courses/'+course.courseslug} className="courses-item-button">Enroll Now</NavLink>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Courses;
