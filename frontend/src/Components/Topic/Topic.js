import React from 'react'
import DashboardHeader from '../Dashboard/DashboardHeader';
import Sidebar from './Sidebar';
import Video from './Video';
import TopicContent from './TopicContent';
import './Topic.css';
import { useFetchTopicsQuery } from '../../features/topics/topicsSlice';
import { useParams } from 'react-router-dom';


const Topic = () => {

  const id = useParams();
  console.log(id); 
  const { data, error, isLoading } = useFetchTopicsQuery(id.topicId);

  if (isLoading) return <div>Loading...</div>

  if (error) return <div>{error.message}</div>
  

  //  const allCourseTopics = data.topics;
  const topicContent = data.topic;
      console.log(data);
  const video=topicContent.isVideo;
  return (
    <>
        <DashboardHeader /> 
        <div class="container-fluid">
  <div class="row">
   <Sidebar /> 

    <main class="col-md-9 ms-sm-auto col-lg-10 px-md-4">
      
   
      {video ? <Video /> : <TopicContent  />} 

    
     
   

     
    </main>
  </div>
</div>
       
 
    </> 
  )
}


export default Topic;