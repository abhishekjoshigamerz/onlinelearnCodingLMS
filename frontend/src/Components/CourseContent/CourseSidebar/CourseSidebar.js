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
            const response =  await axios.get(`http://https://code.freeeducationindia.com/api/course/${slug}`);
            console.log(response.data.course);
            setTitle(response.data.course.name);
            console.log(response.data.Topics);
            setTopics(response.data.course.topics);
            console.log(topics);
            
        } catch (error) {
            console.error('Error fetching topics:', error);
          }
        };
    
        fetchTopics();
      }, [slug]);
    return (
        <div className="course-sidebar">
            <h4 className="course-title"> <NavLink to={'/courses/'+slug} className="linkTopics"> { title } </NavLink></h4>
            <div className="sidebar-content">
            <ul className="sidebar-topics">
            {topics.map((topic) => (
                <NavLink to={'/courses/'+slug+'/topic/'+topic._id} className="linkTopics"><li id={topic._id} key={topic._id}>{topic.name}</li></NavLink>
            ))}
            </ul>
            </div>
        </div>

    );
}

export default CourseSidebar;