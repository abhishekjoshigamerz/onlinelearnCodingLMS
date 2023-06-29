import React,{useState} from 'react';
import { NavLink } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useFetchCourseByIdQuery } from '../../features/course/coursesSlice';
const Sidebar = () => {
 
  const courseId = useParams();
  const [activeLink, setActiveLink] = useState(false);
  console.log(courseId); 
  const { data, error, isLoading } = useFetchCourseByIdQuery(courseId.courseId);
  const id = courseId.courseId;
  const user = useSelector(state => state.user.user);
  const topicsDone = user?.topicsDone[id] || [];
 
  if (isLoading) return <div>Loading...</div>

  if (error) return <div>{error.message}</div>

  console.log(data.topics);
  const allTopics = data.topics;
  return (
    <>
       <nav id="sidebarMenu" class="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse">
      <div class="position-sticky pt-3" style={{overflow: 'auto', maxHeight: '100vh'}}>
        <ul class="nav flex-column">
          
          {/* Map over topics to create a list of topic links */}
            {allTopics.map((topic, index) => (
              <li key={topic._id} className="nav-item" style={{fontSize:'18px', margin:'0', backgroundColor:'#f5f5f5', borderRadius:'10px', padding:'10px'}}>
                {/* <NavLink 
                  className="nav-link" 
                  aria-current="page"  
                  to={`/course/${id}/topic/${topic._id}`}   
                  style={{fontSize:'18px', color:'#333', textDecoration:'none'}}
                >
                  <span data-feather="file"></span>
                  {topic.name} &nbsp;
                   {topicsDone.includes(topic._id) && <span style={{color: 'white'}}>✔</span>}
                </NavLink> */}
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
