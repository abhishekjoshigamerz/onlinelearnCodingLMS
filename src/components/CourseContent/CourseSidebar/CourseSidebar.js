import React,{useState} from "react";
import './CourseSidebar.css';
import { databases,Query  } from "../../../services/appwrite";
import { useEffect } from "react";
import { useParams,NavLink } from "react-router-dom";

const CourseSidebar = () => {
    const {slug} = useParams();
    const [topics, setTopics] = useState([]);
    console.log(slug);

    useEffect(() => {
        const fetchTopics = async () => {
          try {
            const response = await databases.listDocuments('64833e8413a93babd4b6', '648470492489f7fdfa72', [
                Query.equal('courseStringSlug', [slug]),
            ]);
            const topicsData = response.documents;
            
            console.log(topicsData);
            setTopics(topicsData);
        } catch (error) {
            console.error('Error fetching topics:', error);
          }
        };
    
        fetchTopics();
      }, [slug]);
    return (
        <div className="course-sidebar">
            <h4>  {slug }</h4>
            <div className="sidebar-content">
            <ul className="sidebar-topics">
            {topics.map((topic) => (
                <NavLink to={'/courses/java/'+topic.$id}><li id={topic.$id} key={topic.collectionId}>{topic.topicName}</li></NavLink>
            ))}
            </ul>
            </div>
        </div>

    );
}

export default CourseSidebar;