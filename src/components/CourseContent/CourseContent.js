import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'; 
import './CourseContent.css';
import Header from '../Header/Header';
import CourseFooter from './CourseFooter/CourseFooter';
import CourseSidebar from './CourseSidebar/CourseSidebar';
import { databases } from '../../services/appwrite';
import AceEditorComponent from '../AceEditorComponent/AceEditorComponent';

const CourseContent = () => {
    const { slug } = useParams();
    const [course, setCourse] = useState(null);
    console.log('Line 13'+slug);
    useEffect(() => {
        const fetchContent = async () => {
            
                const response = await databases.listDocuments('64833e8413a93babd4b6', '648445e5a12e6ed3ebe8');
                const courses = response.documents;
                const course = courses.find((course) => course.courseslug === slug);
                setCourse(course);
            

           
        }

        fetchContent();

    }, [slug]);
  return (
    <>
    <Header />
    <div className="course-content">
        <CourseSidebar />

      {/* <div className="content">
        <h3>{course.courseTitle}</h3>
        <p> {course.courseDescription} </p>
      </div> */}

        {course && (
          <div className="content">
            <h3>{course?.courseTitle}</h3>
            <p>{course?.courseDescription}</p>
          </div>
        )}

      <div className="ace-editor">
        <AceEditorComponent />
      </div>
    </div>
    <CourseFooter />
  </>
  );
};

export default CourseContent;
