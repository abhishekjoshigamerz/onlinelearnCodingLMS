import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'; 

import Header from '../../Header/Header';
import CourseFooter from '../CourseFooter/CourseFooter';
import CourseSidebar from '../CourseSidebar/CourseSidebar';
// import AceEditorComponent from '../../AceEditorComponent/AceEditorComponent';
import AceEditorComponent from '../../AceEditorComponent/AceEditorCourseComponent';
import axios from 'axios';
import './TopicContent.css';


const TopicContent = () => {
    const { slug,id } = useParams();
    const [topicContent, setTopicContent] = useState(null);
    const [code, setCode] = useState("");
    const [output,setOutput] = useState(null);
    useEffect(() => {
        const fetchContent = async () => {
          
            const response = await axios.get(`http://https://code.freeeducationindia.com/api/gettopic/${id}`);
            const getTopic = response.data.topic;
            setTopicContent(getTopic);   
        }

        fetchContent();

    }, [id]);
    return (
        <>
        <Header />
        <div className="course-content">
        <CourseSidebar />
        <div className='course-content'>
           Topic Content

        </div>
        <AceEditorComponent code={code} setCode={setCode}/>   
        </div>
         
        {/* <Header />
        <div className="course-content">
          
            <div className='content'>
  {topicContent && (
    <>
      <h2 className="content-title">{topicContent.name}</h2>
      {output ? (
        <div>
          <h3>Output:</h3>
          <pre>{output}</pre>
        </div>
      ) : (
        <pre className='pre'>
          {topicContent.description}
        </pre>
      )}
    </>
  )}
</div>
    
          <div className="ace-editor">
            <AceEditorComponent code={code} setCode={setCode}/>
          </div>
        </div>
        <CourseFooter code={code}  output={output} setOutput={setOutput}/> */}
      </>
    );
    
};

export default TopicContent;
