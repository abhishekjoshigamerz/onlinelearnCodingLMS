import React from 'react';
import {submitCode, getSubmissionStatus} from '../../services/judge0';  

const TopicFooter = ({code}) => {

    //wait for results 
    const waitForResults = async (token) => {

        const status = await getSubmissionStatus(token);
        if(status && status.status.id <= 2){
            setTimeout(() => {
                waitForResults(token);
            }, 1000);

        }else if(status){
            const result = await getSubmissionStatus(token);

            if(result.status.id === 6){
                const output =  atob(result.compile_output);
                
                console.log(output);
                
              }else if(result.status.id===3){
                console.log(result.stdout);
                console.log(atob(result.stdout));
                console.log('Accepted');
               //setOutput(output);
              }else if(result.status.id===4){
                console.log('Failed for a  test case');
                //setOutput('Failed for a  test case');
              }
        }
        
    }


    const handleClick = async () => {
        alert('Code Submitted');

        let value  = btoa(code);
        console.log(value);
        const request = await submitCode(value,62,'30');

        if(request){
            console.log(request);
            waitForResults(request.token);
        }

    }
    return (
        <div className='topic-footer'>
            
            <button className='submit-code' onClick={handleClick}>Submit Code</button>
        </div>
    )    
}

export default TopicFooter;
