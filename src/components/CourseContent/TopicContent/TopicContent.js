import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'; 
import './TopicContent.css';
import Header from '../../Header/Header';
import CourseFooter from '../CourseFooter/CourseFooter';
import CourseSidebar from '../CourseSidebar/CourseSidebar';
import { databases,Query } from '../../../services/appwrite';
import AceEditorComponent from '../../AceEditorComponent/AceEditorComponent';

const TopicContent = () => {
    const { slug,id } = useParams();
    const [topicContent, setTopicContent] = useState(null);
    console.log('Line 13 is '+id);
    useEffect(() => {
        const fetchContent = async () => {
            console.log("Inside the userEffect");
            const response = await databases.getDocument('64833e8413a93babd4b6', '648470492489f7fdfa72', id);
            const getTopic = response.documents;
            setTopicContent(getTopic);
            console.log('Line 20 is ' + getTopic);
           
        }

        fetchContent();

    }, [id]);
    return (
        <>
        <Header />
        <div className="course-content">
            <CourseSidebar />
    
            <div className='content'>
             {topicContent && (
                 <>
                 <h3>{topicContent[0].topicName}</h3>
                    <pre>
                        {topicContent[0].topicContent}
                    </pre>
                 </>
              )}
            </div>
    
          <div className="ace-editor">
            <AceEditorComponent />
          </div>
        </div>
        <CourseFooter />
      </>
    );
    
};

export default TopicContent;
