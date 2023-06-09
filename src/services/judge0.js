import axios from 'axios';

const JUDGE0_API = 'http://139.144.5.252:2358'; // Use your custom Judge0 API if necessary


export const submitCode = async (source_code, language_id, stdin) => {
  let input = btoa(stdin);
  try {
    const response = await axios.post(
      `${JUDGE0_API}/submissions?base64_encoded=true&wait=false`, 
      {
        source_code: source_code,
        language_id: language_id,
        stdin: input,
        expected_output: 'MSAKMCAxIAoxIDAgMSAKMCAxIDAgMSAKMSAwIDEgMCAxIAowIDEgMCAxIDAgMSAK'
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