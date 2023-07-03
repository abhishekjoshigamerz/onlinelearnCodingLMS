import {react, useState} from 'react';
import { doBatchedSubmission,getBatchedSubmissionStatus } from '../../services/compiler';
import { useMarkAssignmentCompleteMutation } from '../../features/topics/topicsSlice';
import { useFetchCoursesQuery } from '../../features/course/coursesSlice';
import { useDispatch , useSelector } from 'react-redux';
import { setUserData } from '../../features/users/userStore';
import { useParams } from 'react-router-dom';

const parse = require('html-react-parser');

export const TopicFooter = ({setCode,data, setIsComipling,setResultMessage,setAIChatBotTextArea}) => {
  const topicData = data;
 
  

  const id = useParams(); 
  const topic_id = id.topicId;
  const course_id = id.courseId;
  const dispatch = useDispatch();
  const getUser = useSelector(state => state.user.user);
  const email = getUser.email;
  let { data:courses } = useFetchCoursesQuery(course_id);
  const [markAssignmentComplete, { isLoading: isMarking }] = useMarkAssignmentCompleteMutation();

  const waitForBatchedResults = async (tokens) => {
  
  const status = await getBatchedSubmissionStatus(tokens);

  if(status){
    let pendingSubmissions = false;
    let successfulTests = 0;

    for (let submission of status.submissions) {
      if (submission.status_id < 3) {
        // If any submission is not done yet, wait for 3 seconds and then check again
        pendingSubmissions = true;
      } else if (submission.status_id === 3) {
        // If a submission is done and successful, increment the successfulTests counter
        successfulTests++;
      }
    }

    if (pendingSubmissions) {
      setTimeout(() => {
        waitForBatchedResults(tokens);
      }, 3000);
      return;  // Exit the function here. We'll check all submissions again after 3 seconds
    }

    // If we reached this point, it means all submissions are done
   

    if (successfulTests === status.submissions.length) {
      setResultMessage(`<div class="alert alert-primary">All test cases passed. </div>`);

      // Mark the assignment as complete
      try {
      const updatedUser = await markAssignmentComplete({ topicId: topic_id, courseId: course_id, email: email, token: getUser.token }).unwrap();
      console.log(getUser);
      console.log(updatedUser);
      // getUser.topicsDone[course_id].push(topic_id);
      let newData = JSON.parse(JSON.stringify(getUser));
      
      console.log('course id is '+course_id);
      if (!newData.topicsDone.hasOwnProperty(course_id)) {
            newData.topicsDone[course_id] = []; // create a new array for this course_id
            newData.topicsDone[course_id].push(topic_id);
            dispatch(setUserData(newData));
      }
      if(!newData.topicsDone[course_id].includes(topic_id)){
         newData.topicsDone[course_id].push(topic_id);
         dispatch(setUserData(newData));
      // Update the user in the Redux store
      
      console.log('Getting out of here now');

      }
      
    } catch (error) {
      console.log(error);
    } 

    } else {
      setResultMessage(`<div class="alert alert-danger">${successfulTests}/${status.submissions.length} cases passed </div>`);
    }

    setIsComipling(false);
  }else{
    console.error("Failed to get status");
    setIsComipling(false);
  }
}

  if (!courses) {
    return <div>Loading...</div>;
  }

  console.log('Course is ');
  
  const courseArray = courses.courses; 
  console.log(courseArray);

  const courseData = courseArray.find(course => course._id == course_id);
  console.log(courseData);
  const handleCodeSubmissions = async(e) =>{
    e.preventDefault();

    console.log(setCode);
     
     const result =  await doBatchedSubmission(btoa(setCode),courseData.language_code ,topicData.topic.testInputs,topicData.topic.testCases);     
      setIsComipling(true);
      if(result){
        
        let tokens = result.map(obj =>obj.token).join(',');
      
        waitForBatchedResults(tokens);
      }
    
    }
      
  const teachAi = async(e) =>{
    e.preventDefault();
    setAIChatBotTextArea(true);
  }

  

  return (
    <>
    <div style={{ backgroundColor: "#f8f9fa", display: "flex", justifyContent: "flex-end", alignItems: "center" , padding: "10px 20px", zIndex:10 }}>
        <button type='button' className='btn btn-warning' onClick={teachAi}>Teach Me AI</button> &nbsp;&nbsp;
        <button type="button" className="btn btn-success" onClick={handleCodeSubmissions}>Submit Code</button>
    </div>

     
      
    </>
  
  )
}


export default TopicFooter;
