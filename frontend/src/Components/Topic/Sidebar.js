import React,{useState} from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useFetchCourseByIdQuery } from '../../features/course/coursesSlice';
import './TopicSidebar.css';
const Sidebar = () => {
 
  const courseId = useParams();
  const [activeLink, setActiveLink] = useState(false);
  const { data, error, isLoading } = useFetchCourseByIdQuery(courseId.courseId);
  const id = courseId.courseId;
  const user = useSelector(state => state.user.user);
  const topicsDone = user?.topicsDone[id] || [];
 
  if (isLoading) return <div>Loading...</div>
  if (error) return <div>{error.message}</div>

  const allTopics = data.topics;

  return (
    <>
       <nav id="sidebarMenu" className="topic-sidebar col-md-3 col-lg-2 d-md-block bg-light sidebar collapse">
          <div class="position-sticky pt-3">
            <ul class="nav flex-column">
            {allTopics.map((topic, index) => (
              <li key={topic._id} className="nav-item" style={{fontSize:'18px', margin:'0', backgroundColor:'#f5f5f5', borderRadius:'10px', padding:'10px'}}>
                <NavLink 
                  className="nav-link" 
                  aria-current="page"  
                  to={`/course/${id}/topic/${topic._id}`}   
                  style={{fontSize:'18px', color:'#333', textDecoration:'none'}}
                  isActive={(match, location) => {
                    if (match) {
                        setActiveLink(true);
                        return true;
                    } else {
                        setActiveLink(false);
                        return false;
                    }
                  }}
                >
                <span data-feather="file"></span>
                {topic.name} &nbsp;
                {topicsDone.includes(topic._id) && 
                    <span 
                        style={ activeLink ? {color: 'white'} : {color: 'green'}}
                    >
                        ✔
                    </span>
                }
                </NavLink>
              </li>
            ))}
            </ul>
          </div>
        </nav>
    </>
  );
};

export default Sidebar;
