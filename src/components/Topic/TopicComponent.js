import {React,useState,useEffect} from 'react';
import { NavLink, useNavigate,useParams } from 'react-router-dom';
import Header from '../Header/Header';
import TopicSidebar from './TopicSidebar';
import TopicContent from './TopicContent';
import TopicEditor from './TopicEditor';
import TopicFooter from './TopicFooter';
import axios from 'axios';


import './TopicComponent.css';
const TopicComponent = () => {
    
    const {slug,id} = useParams();
    const courseId = slug;
    const topicId = id; 

    const [topic,setTopic] = useState({});
    const [title,setTitle] = useState('');
   
    const [topiccontent,settopicContent] = useState('');
   
    const [code, setCode] = useState('');
    //sets sidebar
    useEffect(() => {
        
        const fetchContent = async () => {
            const response = await axios.get(`http://localhost:5000/api/course/${courseId}`);
            if(response){
                console.log(response.data.course.topics);
                // setTitle(response.data.course.name);
                 setTopic(response.data.course.topics);

                // console.log(topic);
            }
        };

        fetchContent();

    }, [courseId,topicId]);

    //set content now 
    useEffect(() => {
        const fetchContent = async () => {
            const response = await axios.get(`http://localhost:5000/api/gettopic/${topicId}`);

            if(response){
                console.log(response.data.topic);

                settopicContent(response.data.topic);
            }

        };

        fetchContent();

    }, [topicId]);
    

    return (
        <>
            <Header />
            <div className='topic-container'>
                <TopicSidebar courseId={courseId} topics={topic}/>  
                <TopicContent topiccontent={topiccontent}/> 
                <TopicEditor code={code} setCode={setCode}/>    
                 
            </div>
            <TopicFooter code={code} />  
        </>
    )

}

export default TopicComponent;