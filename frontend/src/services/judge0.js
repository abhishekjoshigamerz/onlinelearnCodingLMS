import axios from 'axios';

const JUDGE0_API = 'http://139.144.5.252:2358'; // Use your custom Judge0 API if necessary


export const submitCode = async (source_code, language_id, stdin,exp_output) => {
  let input = btoa(stdin);
  try {
    const response = await axios.post(
      `${JUDGE0_API}/submissions?base64_encoded=true&wait=false`, 
      {
        source_code: source_code,
        language_id: language_id,
        stdin: input,
        expected_output: exp_output
      }
    );

    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const getSubmissionStatus = async (token) => {
  try {
    const response = await axios.get(`${JUDGE0_API}/submissions/${token}?base64_encoded=true`);
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export const practiceSubmitCode = async (source_code, language_id, stdin) => {
  let input = btoa(stdin);
  console.log(language_id);
  try {
    const response = await axios.post(
      `${JUDGE0_API}/submissions?base64_encoded=true&wait=false`, 
      {
        source_code: source_code,
        language_id: language_id,
        stdin: input,
      }
    );

    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export const doBatchedSubmission = async (source_code, language_id, stdin,exp_output) => {

  let batchedSubmissions = {
    "submissions":[]
  }

  for(let i = 0 ; i< stdin.length;i++){
    let submission = {"language_id": language_id,
    "source_code": source_code,
    "stdin": stdin[i],
    "expected_output": exp_output[i]
    }

    batchedSubmissions.submissions.push(submission);

  }


  try{
    const response = await axios.post( `${JUDGE0_API}/submissions/batch?base64_encoded=true`,batchedSubmissions);
    
    
    return response.data;   
  }catch(error){
    console.log(error);
    return null;
  }
}



export const getBatchedSubmissionStatus = async (token) => {

  try{
  let result =  await axios.get(`${JUDGE0_API}/submissions/batch?tokens=${token}&base64_encoded=true&fields=token,stdout,stderr,status_id,language_id`);
    if(result){
      return result.data;
    }
  
  }catch(error){
    console.log(error);
    return null;
  }


}