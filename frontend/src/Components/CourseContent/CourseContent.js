import React, { useEffect, useState } from 'react';
import { useParams,NavLink } from 'react-router-dom'; 
import './CourseContent.css';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

import CourseSidebar from './CourseSidebar/CourseSidebar';
import AceEditorComponent from '../AceEditorComponent/AceEditorComponent';
import axios from 'axios'; 
const parse = require('html-react-parser');


const CourseContent = () => {
    const { slug } = useParams();
    console.log(slug);
    const [course, setCourse] = useState(null);
   const [topic,setTopic] = useState(null);
    useEffect(() => {
        const fetchContent = async () => {
          try {
            const response = await axios.get(`http://https://code.freeeducationindia.com/api/course/${slug}`);
            console.log(response.data.topics);
            setCourse(response.data.course);
            setTopic(response.data.topics);
          } catch (error) {
            console.error("Error fetching course data: ", error);
          }
        }
        fetchContent();
    }, [slug]);

  return (
    <>
      <Header />
      
        {course ? (
          // <div className="content">
          //   <h3>{course.name}</h3>
          //   <p>{course.description}</p>
          // </div>
          <div className='course-container'>
            <div className="course-header">
              <div className="course-details">
                  <h1 className="course-name">{course.name}</h1>
                  <p className="course-summary">Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum </p>
                  <p className="course-instructor">Instructor: Team LearnToCode</p>
                 
                  {/* {isEnrolled ? 
                      <button className="course-button">Start Now</button> 
                      : 
                      <button className="course-button">Enroll Now</button>
                  } */}
              </div>
              <div className="course-image-container">
                  <img className="course-image" src={course.image} alt={course.name} className="course-image" />
                  <NavLink to={"/courses/"+course._id+"/topic/"+topic[0]._id} className="course-button">Start Now</NavLink>
              </div>
          </div>
          <div className="course-description">
            <h2>Course Description : </h2>
            <p>{parse(course.description)}</p>

            <h2>Course Topics</h2>
            <ul className="course-topics">
                {course.topics.map((topic, index) => (
                    <li key={index}>{topic.name}</li>
                ))}
            </ul>
        </div>        

        </div>
          
        
        ) : (
          <div>Loading...</div>
        )}
        
      {/* </div> */}
      <Footer />
    </>
  );
};

export default CourseContent;
