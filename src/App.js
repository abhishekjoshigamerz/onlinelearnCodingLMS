import React ,  { useState,useRef } from 'react';
import './App.css'; // Make sure to create this CSS file
import AceEditor from 'react-ace';
import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/ext-language_tools";


const menus = ['Menu 1', 'Menu 2', 'Menu 3', 'Menu 4','Menu 5','Menu 6','Menu 7','Menu 8','Menu 9','Menu 10']; // List of your menus

//displays output and code results if we pass all the cases for code
function NewComponent({goBack}) {
  return <div className='output'>
   <p> Nunc vitae ullamcorper dui. Mauris id lacinia lorem, in feugiat lacus. Nullam 
at metus et lacus pellentesque volutpat non quis sem. Aliquam blandit vitae 
justo ut eleifend. Aliquam erat volutpat. Cras sed dapibus elit, eu ornare 
turpis. Maecenas ultrices aliquam nisl, nec lobortis mi tincidunt quis.
</p><br />
<button type='button' className='button' onClick={goBack}>Back</button>
  </div>
}

function TestCaseComponent({goBack}) {
  return <div className='output'>
    <p> Nunc vitae ullamcorper dui. Mauris id lacinia lorem, in feugiat lacus. Nullam</p>
    <button type='button' className='button' onClick={goBack}>Back</button>
  </div>
}

function App() {
  //checks for submisisons
  const [submitted , setSubmitted] = useState(false);
  const [testcaseSubmission, setTestcaseSubmission] = useState(false);
  //keeps on changing values 
  const editorRef = useRef(null);
  
  //handles test cases
  const handleTestCase = () => {
    setTestcaseSubmission(!testcaseSubmission);
    if(editorRef.current){
      let code = btoa(editorRef.current.editor.getValue());
      console.log(code);
    }
  };



  //hanle code submission
  const handleClick = () => {
    setSubmitted(!submitted);
   
    if(editorRef.current){
      let code = btoa(editorRef.current.editor.getValue());
      console.log(code);
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
        {!submitted 
            ? <p>This is some text in the center of the page.</p> 
            : <NewComponent goBack={handleClick} />
          }  
        {!testcaseSubmission
            ? <p>This is some text in the center of the page.</p>
            : <TestCaseComponent goBack={handleTestCase} />
        }

        </div>
        <div className="editor">
        <AceEditor
            mode="java"
            theme="monokai"
            name="ACE_EDITOR_DIV"
            editorProps={{ $blockScrolling: true }}
            fontSize={14}
            showPrintMargin={true}
            showGutter={true}
            highlightActiveLine={true}
            value={'import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner scanner = new Scanner(System.in);\n        String name = scanner.nextLine();\n        System.out.println("hello, " + name);\n    }\n}\n'
          }
           
            setOptions={{
              enableBasicAutocompletion: true,
              enableLiveAutocompletion: true,
              enableSnippets: true,
              showLineNumbers: true,
              tabSize: 2,
            }}
            style={{ width: '100%', height: '100%' }}
            ref={editorRef}
          />
        </div>
      </div>
      <div className='footer'>
        <button type='submit' onClick={handleTestCase}>Test Cases</button>
        <button type='submit' onClick={handleClick}>Submit Code</button>
      </div>          
    </div>
    
  );
}

export default App;
