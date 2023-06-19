import React from 'react';
import {submitCode, getSubmissionStatus,doBatchedSubmission,getBatchedSubmissionStatus} from '../../services/judge0';  
import axios from 'axios';

const TopicFooter = ({code,topicId,courseId, topiccontent, userEmail, completedTopics, setCompletedTopics}) => {
    //markasComplete

    const markAsComplete = async(event) => {
        event.preventDefault();
    
      
    
        const data = {
            topicId: topicId,
            courseId: courseId,
            userEmail: userEmail
        }
    
        let request = await axios.post('http://localhost:5000/api/markascomplete',data);
    
        if(request.status === 200){
            setCompletedTopics(prevTopics => {
                if(prevTopics.length === 0){
                    return [request.data.topicId];
                } else {
                    return [...prevTopics, request.data.topicId];
                }
            });
        } else {
            console.log('Error');
        }
    }
        



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

    const waitForBatchedResults = async (tokens) => {
       
        const status = await getBatchedSubmissionStatus(tokens);
        if (status) {
            for (let submission of status.submissions) {
                if (submission.status_id < 3) {
                    // If any submission is not done yet, wait for 3 seconds and then check again
                    setTimeout(() => {
                        waitForBatchedResults(tokens);
                    }, 3000);
                    return;  // Exit the function here. We'll check all submissions again after 3 seconds
                }
            }
            // If we reached this point, it means all submissions are done
            console.log("All submissions are done. Here are the results:");
            console.log(status.submissions);
            for(let index in status.submissions){
                console.log(status.submissions[index]);
            }
           
        } else {
            console.error("Failed to get status");
        }
    }


    const handleClick = async () => {
        alert('Code Submitted');
        console.log(topiccontent);
        if(topiccontent.testCases.length > 0){
            let value = btoa(code);
            const request = await doBatchedSubmission(value,62,topiccontent.testInputs,topiccontent.testCases);
            
            if(request){
                console.log(request);
                let tokens = request.map(obj =>obj.token).join(',');
                waitForBatchedResults(tokens);
               
                
            }

        }
        // }else{
        //     let value  = btoa(code);
        //     console.log(value);
        //     const request = await submitCode(value,62,'30');
    
        //     if(request){
        //         console.log(request);
        //         waitForResults(request.token);
        //     }
        // }

    }
    return (
        <div className='topic-footer'>
            <button className='mark-complete' onClick={markAsComplete}>Mark Complete</button>
            <button className='submit-code' onClick={handleClick}>Submit Code</button>
        </div>
    )    
}

export default TopicFooter;
