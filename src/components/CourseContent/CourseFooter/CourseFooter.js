import React from 'react';
import './CourseFooter.css';
import axios from 'axios';
import { submitCode,getSubmissionStatus } from '../../../services/judge0';

  

const CourseFooter = ({code,printingOutput,setOutput}) => {

  const waitAndGetResult = async (token) => {
    const status = await getSubmissionStatus(token);
    if (status && status.status.id <= 2) {
      // Status code 1 or 2 indicates the code is still in the queue
      setTimeout(() => waitAndGetResult(token), 1000); // Retry after 1 second
    } else if (status) {
      // Code is compiled and result is available
      const result = await getSubmissionStatus(token);
      
      if(result.status.id === 6){
        const output =  atob(result.compile_output);
        
        setOutput(output);
        
      }else if(result.status.id===3){
        console.log(result.stdout);
       const output = atob(result.stdout);
       
       setOutput(output);
      }else if(result.status.id===4){
        
        setOutput('Failed for a  test case');
      }
      // Handle the result as needed
    }
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    
    const data = btoa(code);

    const response = await submitCode(data, 62, "World");

    if(response){
      const token = response.token;
      console.log(token);
      waitAndGetResult(token);
    }

  };

  return (
    <footer className="course-footer">
      <button className="course-footer-button" onClick={handleSubmit}>Submit Code</button>
    </footer>
  );
};

export default CourseFooter;
