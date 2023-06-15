import React,{useState} from "react";
import './CourseSidebar.css';

import { useEffect } from "react";
import { useParams,NavLink } from "react-router-dom";
import axios from 'axios';
const CourseSidebar = () => {
    const {slug} = useParams();
    const [topics, setTopics] = useState([]);
    const [title,setTitle] = useState('');
    console.log(slug);
    
    useEffect(() => {
        const fetchTopics = async () => {

          try {
            const response =  await axios.get(`http://localhost:5000/api/course/${slug}`);
            console.log(response.data.course);
            setTitle(response.data.course.name);
            console.log(response.data.Topics);
            setTopics(response.data.Topics);
            // const response = await databases.listDocuments('64833e8413a93babd4b6', '648470492489f7fdfa72', [
            //     Query.equal('courseStringSlug', [slug]),
            // ]);
            // const topicsData = response.documents;
            
            // console.log(topicsData);
            // setTopics(topicsData);
        } catch (error) {
            console.error('Error fetching topics:', error);
          }
        };
    
        fetchTopics();
      }, [slug]);
    return (
        <div className="course-sidebar">
            <h4 className="course-title">  { title }</h4>
            <div className="sidebar-content">
            <ul className="sidebar-topics">
            {topics.map((topic) => (
                <NavLink to={'/courses/'+slug+'/topic/'+topic._id}><li id={topic._id} key={topic._id}>{topic.name}</li></NavLink>
            ))}
            </ul>
            </div>
        </div>

    );
}

export default CourseSidebar;