import {React,useState,useEffect} from 'react';
import { NavLink, useNavigate,useParams } from 'react-router-dom';
import Header from '../Header/Header';
import TopicSidebar from './TopicSidebar';
import TopicContent from './TopicContent';
import TopicEditor from './TopicEditor';
import TopicFooter from './TopicFooter';
import axios from 'axios';
import {useAuthUser} from 'react-auth-kit';
import './TopicComponent.css';
const TopicComponent = () => {
    
    const {slug,id} = useParams();
    const courseId = slug;
    const topicId = id;
    

    //completed topics 
    const [completedTopics, setCompletedTopics] = useState([]);
    const [isCompiling, setIsCompiling] = useState(false);
    const [isOutputReady, setIsOutputReady] = useState(false);
    const [outputData, setOutputData] = useState(null);


    const userEmail = useAuthUser();
    
    const [topic,setTopic] = useState({});
    const [title,setTitle] = useState('');
   
    const [topiccontent,settopicContent] = useState('');
   
    const [code, setCode] = useState('');
    //sets sidebar
    useEffect(() => {
        
        const fetchContent = async () => {
            const response = await axios.get(`http://https://code.freeeducationindia.com/api/course/${courseId}`);
            if(response){
             
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
            const response = await axios.get(`http://https://code.freeeducationindia.com/api/gettopic/${topicId}`);

            if(response){
               

                settopicContent(response.data.topic);
            }

        };

        fetchContent();

    }, [topicId]);
    

    //fetch users data
    useEffect(() => {
        const fetchContent = async () => {
            const request = await axios.get(`http://https://code.freeeducationindia.com/api/getcompletedtopics/${courseId}/${userEmail().email}`);
            
            if(request.status==200){
                console.log(request.data.completedTopics); 
                if(request.data.completedTopics.length>0){
                    setCompletedTopics(request.data.completedTopics);
                }else{
                    setCompletedTopics([]);
                }
                
            }            
        }


        fetchContent();
    },[]);

    return (
        <>
            <Header />
            <div className='topic-container'>
                <TopicSidebar courseId={courseId} topics={topic} completedTopics={completedTopics}/>  
                <TopicContent 
                    topiccontent={topiccontent} 
                    isCompiling={isCompiling}
                    isOutputReady={isOutputReady} 
                    outputData={outputData}
                    setIsOutputReady={setIsOutputReady} 
                /> 
                <TopicEditor code={code} setCode={setCode}/>    
                 
            </div>
            <TopicFooter 
                code={code}
                topicId={topicId}
                 courseId={courseId}
                 topiccontent={topiccontent}
                 userEmail={userEmail().email}

                completedTopics={completedTopics}
                 setCompletedTopics={setCompletedTopics}
                setIsCompiling={setIsCompiling}
                setIsOutputReady={setIsOutputReady}
                setOutputData={setOutputData} 
            />  
        </>
    )

}

export default TopicComponent;