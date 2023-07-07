import React,{ useState, useEffect } from 'react'
import DashboardHeader from '../Dashboard/DashboardHeader';
import Sidebar from '../Dashboard/Sidebar';
import { useFetchCourseByIdQuery } from '../../features/course/coursesSlice';
import { useParams } from 'react-router-dom';
import Loading from '../Loading/Loading';
import Editor from '@monaco-editor/react';

import { practiceSubmitCode,getSubmissionStatus  } from '../../services/compiler';
const parse = require('html-react-parser');

const PracticeIDE = () => {
    
    
    const language = {
        62:{
            code : 'class Main{\n public static void main(String[] args){\n System.out.println("Hello World");\n }\n}',
            mode: 'java'
        },
        71: {
        code : `def main():\n    print("Hello World")\n\nif __name__ == "__main__":\n    main()`,
        mode : 'python' 
        },
        53:{
        code : `#include<iostream>\n\nint main() {\n    std::cout << "Hello World";\n    return 0;\n}`,
        mode: 'cpp'
        }    
    }
    
    
    const [languageMode, setlanguageMode] = useState('');
    const [setCode, setCodeState] = useState('');
    const [languageCode, setLanguageCode] = useState('');
    const [isComipling, setIsComipling] = useState(false);
    const [resultMessage, setResultMessage] = useState(null);

    const handleResultMessage = (e) => {
        e.preventDefault();
        setResultMessage(null);
    }

     const waitAndGetResult = async (token) => {
        const status = await getSubmissionStatus(token);
        if (status && status.status.id <= 2) {
          // Status code 1 or 2 indicates the code is still in the queue
          setTimeout(() => waitAndGetResult(token), 5000); // Retry after 5 second
        } else if (status) {
          // Code is compiled and result is available
          const result = await getSubmissionStatus(token);
           
          if(result.status.id === 6){
            // let output =  atob(result.compile_output);
            console.log(result);
            let output = `<p>Code Output : </p> <pre>Error: ${atob(result.compile_output)}</pre>
            
            `
            setResultMessage(output);
             setIsComipling(false);
          }else if(result.status.id===3){
            console.log(result.stdout);
           let output = `<p>Code Output :</p> <pre>${atob(result.stdout)}</pre><br />
         
           `;
           
           setResultMessage(output);
            setIsComipling(false);
          }else if(result.status.id===4){
            setIsComipling(false);
            setResultMessage('Failed for a  test case');
          }else{
            console.log(result);
          }
          // Handle the result as needed
        }
      };

    const handleCodeSubmission = async(languageCode) => {
        
        setIsComipling(true);
        
        let result = await practiceSubmitCode(btoa(setCode),languageCode,'java');

        if(result){
            const token = result.token;
            waitAndGetResult(token);

        }
    }

    const changeProgramming = (e) => {
        
        setCodeState(language[e.target.value].code);
        setlanguageMode(language[e.target.value].mode);
        setLanguageCode(e.target.value);
        console.log(setCode);
        console.log(languageMode);
    }
   

    return (
    <>    
    <DashboardHeader />
    <div className="container-fluid">
        <div className="row">
            <Sidebar />
             <main class="col-md-9 ms-sm-auto col-lg-10 px-md-4">
            <div style={{ height: "calc(90vh - 50px)", overflow: "hidden" }}>
        <div className="row h-100">
            <div className="col-md-6" style={{padding:50 , overflowY:'auto',  maxHeight: "calc(90vh - 50px)"}}>
            <h1>Practice IDE </h1>
                {
    isComipling ? <Loading /> :
    (resultMessage ? <div><p>{parse(resultMessage)}</p>
          <button class="btn btn-warning" onClick={handleResultMessage}>Close</button>
    </div> :  
            <div className='practiceIDe'>
                <p>
                    Welcome to the PracticeIDE, your new virtual environment for coding in language of your choice!
                </p>
                 <select class="form-select" aria-label="Select Programming Language" onChange={changeProgramming}>
                    <option selected>Select Programming Language</option>
                    <option value="62">Java</option>
                    <option value="71">Python</option>
                    <option value="53">C++</option>
                </select>
                <br />
                <p>
                    Our platform allows you to put theory into practice, experiment with new concepts, and validate your learning in real-time. You can freely write, compile, and run your Java code snippets directly within our intuitive and user-friendly interface.
                </p>
                <p>
                    However, it's important to note that at present, our PracticeIDE does not support dynamic user inputs. So, you'll need to hardcode the inputs for your programs. Though this may initially seem like a limitation, it actually allows you to focus on the code structure and logic without getting distracted by input/output handling.
                </p>
                <p>
                    Hardcoding your inputs allows you to predict your output, enhancing your ability to debug and correct your code effectively. Plus, it ensures you fully understand the logic of your program before adding the complexity of dynamic inputs.
                </p>
                <p>
                    This coding playground, though simplified, is a powerful tool for learning. The more you use it, the more you'll strengthen your problem-solving and  programming skills. Over time, you'll grow more confident in your ability to develop complex, efficient algorithms.
                </p>
                <p>
                    So, why wait? Dive into the PracticeIDE and start your journey of learning, experimenting, and mastering  programming. Remember, practice makes perfect, and with PracticeIDE, you have the perfect practice platform right at your fingertips. Happy coding!    
                </p> 

               
                
            </div>)
            }
   
            </div>
            <div className="col-md-6 h-100">
                   <Editor
                        height="90vh"
                        language={languageMode}
                        value={setCode}
                        theme='vs-dark'
                         options={{
                            automaticLayout: true,
                            wordWrap: 'on',
                            colorDecorators: true
                        }}
                        onChange={value => setCodeState(value)}
                   />
            </div> 
        </div>  
    </div>
      <div style={{ backgroundColor: "#f8f9fa", display: "flex", justifyContent: "flex-end", alignItems: "center" , padding: "10px 20px", zIndex:10 }}>
            <button type="button" className="btn btn-success" onClick={(event)=>handleCodeSubmission(languageCode)}>Submit Code</button>
         </div> 
    </main>
             
        

        </div>
        
    </div>
    
       
    </>
  );
}


export default PracticeIDE;

