import React from 'react';
import { useSelector,useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useMarkAssignmentCompleteMutation,useFetchTopicsQuery } from '../../features/topics/topicsSlice';

import { setUserData } from '../../features/users/userStore';

const Video = () => {
  const id = useParams();
  const topic_id = id.topicId;
  const course_id = id.courseId;
  const { data, isError, isFetching, isLoading, isSuccess } = useFetchTopicsQuery(topic_id);
  const getUser = useSelector(state => state.user.user);
  const email = getUser.email;

  const dispatch = useDispatch();
  const [markAssignmentComplete, { isLoading: isMarking }] = useMarkAssignmentCompleteMutation();

  const markAsDone = async() => {
    console.log("Marking as done");
    try {
       const updatedUser = await markAssignmentComplete({ topicId: topic_id, courseId: course_id, email: email, token: getUser.token }).unwrap();

       let newData = JSON.parse(JSON.stringify(getUser));
       if (!newData.topicsDone.hasOwnProperty(course_id)) {
            newData.topicsDone[course_id] = []; // create a new array for this course_id
            newData.topicsDone[course_id].push(topic_id);
            dispatch(setUserData(newData));
      }
      if(!newData.topicsDone[course_id].includes(topic_id)){
         newData.topicsDone[course_id].push(topic_id);
         dispatch(setUserData(newData));
     
      
      console.log('Getting out of here now');

      }

    } catch (error) {
      console.log(error);
      alert('Error in marking as done. Please try again later');
    }
  }

  if(isError){
    console.log(isError.message);
    return (
      <div className="container">
        <div className="row">
          <div className="col-12">
            <h1>Something went wrong!</h1>
          </div>
        </div>
      </div>
    )
  }

  if (isLoading || isFetching) {

    return <p>Loading ....</p>

  }

  console.log(data.topic);


  return (
    <> 
    <div style={{ position: "relative", height: "calc(100vh - 50px)" }}>
      <iframe
        style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}
        src={data.topic.description}
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture "
        allowFullScreen
      ></iframe>
    
      
    </div>
    <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: 50, backgroundColor: "#f8f9fa", display: "flex", justifyContent: "flex-end", alignItems: "center" , paddingRight: "20px"  }}>
        <button type="button" className="btn btn-success" onClick={markAsDone}>Mark as done</button>
      </div>
    </>
  )
}

export default Video;
