import React from 'react';
import {practiceSubmitCode,getSubmissionStatus} from '../../services/judge0';
import { NavLink } from 'react-router-dom';
const Footer = ({code,output,setOutput}) => {
    

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
          }else{
            console.log(result);
          }
          // Handle the result as needed
        }
      };

    const handleOnClick = async (e) => {
        e.preventDefault();

        console.log(code);
        const data = btoa(code);
        console.log('Line 41 data is ');
        console.log(data);
        const response = await practiceSubmitCode(data, 62, 'Java');

        if (response) {
            const token = response.token;
            console.log(token);
            waitAndGetResult(token);
        }
    }
  
    return (
    <footer className="footer">
      <h2 className="footer-title">Site Title</h2>
      <div className="footer-links">
   
        <button  onClick={handleOnClick} className="footer-link">Submit Code</button>
      </div>
    </footer>
  );
}

export default Footer;