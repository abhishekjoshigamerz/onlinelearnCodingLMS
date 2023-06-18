import { NavLink } from 'react-router-dom';
import {react,useState,useEffect} from 'react';
const TopicSidebar = ({courseId, topics}) => {
    console.log('Inside Sidebar topics are: ', topics);
    console.log('Inside sidebar course Id is ', courseId);
    const [isCompleted, setIsCompleted] = useState(false);
    return (
        <div className="topic-sidebar">
            <div className="sidebar-content">
                <h3 className='sidebar-header'>Topics </h3>
                <ul className="sidebar-topics">
                    {topics && topics.length > 0 ? (
                        topics.map((topic) => (
                            <NavLink 
                                to={'/courses/' + courseId + '/topic/' + topic._id}
                                className="linkTopics"
                                key={topic._id}
                            >
                                <li id={topic._id}>{topic.name} {isCompleted && <span style={{ color: 'green' }}>&#10004;</span>}</li> 
                            </NavLink>  
                        ))
                    ) : (
                        <div>Loading topics...</div>
                    )}
                </ul>
            </div>
        </div>        
    );
}

export default TopicSidebar;
