import React ,  { useState,useRef } from 'react';
import './App.css'; // Make sure to create this CSS file
import {Editor} from './components/AceEditorBar/editor';


import { submitCode,getSubmissionStatus } from './services/judge0';

const menus = ['Menu 1', 'Menu 2', 'Menu 3', 'Menu 4','Menu 5','Menu 6','Menu 7','Menu 8','Menu 9','Menu 10']; // List of your menus

//displays output and code results if we pass all the cases for code
function NewComponent({goBack,data}) {
  if(data.status.id==6){
    let output = atob(data.compile_output);
    return <div className='output'>
    <h4>Code Output : </h4>
   <p className='errorMessage'> {output} </p><br />
   </div>
  }else{
    let output = atob(data.stdout);
    const lines = output.split('\n');
  return <div className='output'>
    <h4>Code Output : </h4>
    {lines.map((line, index) => (
          <p key={index}>{line}</p>
    ))}<br />
    <br />
    <hr />
    <pre>{output}</pre>
    <p>Number of Test cases passed : 20/20</p>
<button type='button' className='button' onClick={goBack}>Back</button>
  </div>
  }
  
}

async function waitForResult(token){
  const result =  await getSubmissionStatus(token);
  if(result.status.id<=2){
    console.log(result);
    // setTimeout(() => waitForResult(result.token), 2000);
    return new Promise(resolve => 
      setTimeout(() => resolve(waitForResult(result.token)), 2000)
    );
  }else{
    console.log(result);
    console.log(result.stdout);
   
    return result;
  } 
} 

function App() {
  //checks for submisisons
  
  const [output, setOutput] = useState(null);
  
  const [isLoading, setIsLoading] = useState(false);

  //keeps on changing values 
  const editorRef = useRef(null);
 
  //hanle code submission
  const handleClick = async() => {
   
    if(output !== null){
      setOutput(null);
    
      return;
    }
    if(editorRef.current){
      setIsLoading(true);
      let code = editorRef.current.editor.getValue();
      const submission = await submitCode(btoa(code), 62, 'World');
      
     
      
      
      if(submission){
        console.log(submission.token);
        const finalresult = await waitForResult(submission.token);
        console.log(finalresult);
        console.log('Line 54');
        if(finalresult){
          setOutput(finalresult);
          setIsLoading(false);          
        }
      }
    }
  };

  return (
    <div className="App">
      <div className='header'>
        <div className="navbar">This is a Header</div>
      </div>
     <div className='panel'>  
        <div className="sidebar">
          <div className="sidebar-header">This is a Sidebar</div>
          <ul className="menu">
            {menus.map((menu, index) => (
              <li key={index}>{menu}</li>
            ))}
          </ul>
        </div>
        <div className="content">
       

{output === null ? (
      isLoading ? (
        <div className='loader-container'>
        <div className="loader">
        </div>
        <p>Testing all user cases</p>
        </div>
      ) : (
        <div className='content-text'>
        <p>This is some text in the center of the page.</p>
        </div>
      )
    ) : (
      <NewComponent goBack={handleClick} data={output} />
    )}


        </div>
       
      </div>
      <div className='footer'>
        <button type='submit' onClick={handleClick}>Submit Code</button>
      </div>          
    </div>
    
  );
}

export default App;
