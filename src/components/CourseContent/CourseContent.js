import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'; 
import './CourseContent.css';
import Header from '../Header/Header';
import CourseFooter from './CourseFooter/CourseFooter';
import CourseSidebar from './CourseSidebar/CourseSidebar';
import AceEditorComponent from '../AceEditorComponent/AceEditorComponent';
import axios from 'axios'; 

const CourseContent = () => {
    const { slug } = useParams();
    console.log(slug);
    const [course, setCourse] = useState(null);

    useEffect(() => {
        const fetchContent = async () => {
          try {
            const response = await axios.get(`http://localhost:5000/api/course/${slug}`);
            console.log(response.data.course);
            setCourse(response.data.course);
          } catch (error) {
            console.error("Error fetching course data: ", error);
          }
        }
        fetchContent();
    }, [slug]);

  return (
    <>
      <Header />
      <div className="course-content">
        <CourseSidebar />
        {course ? (
          <div className="content">
            <h3>{course.name}</h3>
            <p>{course.description}</p>
          </div>
        ) : (
          <div>Loading...</div>
        )}
        
      </div>
      <CourseFooter />
    </>
  );
};

export default CourseContent;
