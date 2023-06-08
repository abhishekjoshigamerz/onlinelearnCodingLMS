import React ,  { useState } from 'react';
import './App.css'; // Make sure to create this CSS file
import AceEditor from 'react-ace';
import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/ext-language_tools";


const menus = ['Menu 1', 'Menu 2', 'Menu 3', 'Menu 4','Menu 5','Menu 6','Menu 7','Menu 8','Menu 9','Menu 10']; // List of your menus

//displays output and code results if we pass all the cases for code
function NewComponent({goBack}) {
  return <div>
   <p> Nunc vitae ullamcorper dui. Mauris id lacinia lorem, in feugiat lacus. Nullam 
at metus et lacus pellentesque volutpat non quis sem. Aliquam blandit vitae 
justo ut eleifend. Aliquam erat volutpat. Cras sed dapibus elit, eu ornare 
turpis. Maecenas ultrices aliquam nisl, nec lobortis mi tincidunt quis.
</p><br />
<button type='button' className='button' onClick={goBack}>Back</button>
  </div>
}

function App() {
  const [submitted , setSubmitted] = useState(false);

  const handleClick = () => {
     
    setSubmitted(!submitted);
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
         
          {/* <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed posuere libero sed 
magna vulputate, a posuere ante dictum. Aliquam erat volutpat. Morbi lorem ante, 
interdum id porttitor at, placerat non diam. Sed quis est ullamcorper, congue 
turpis ac, tincidunt lorem. Quisque posuere urna sed justo finibus dapibus. 
<br /><br />
Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac 
turpis egestas. Nunc eget porttitor purus. Quisque laoreet diam et congue 
porttitor. Fusce ullamcorper, sem eu lacinia volutpat, velit nunc vulputate 
arcu, ac lobortis elit turpis sed velit. 
<br /><br />
Proin sodales auctor mauris a bibendum. Suspendisse pulvinar fringilla ultrices. 
In hac habitasse platea dictumst. Sed elementum velit velit, at posuere metus 
suscipit at. Quisque malesuada lacinia lacus, id venenatis ante ullamcorper et. 
<br /><br />
Praesent tempus finibus ipsum, sit amet commodo arcu semper at. Donec auctor 
gravida neque, sit amet ultrices massa tempus id. Sed sed neque in est 
consequat maximus. Proin congue erat in lectus euismod, sed sollicitudin diam 
lobortis. 
<br /><br />
Nunc vitae ullamcorper dui. Mauris id lacinia lorem, in feugiat lacus. Nullam 
at metus et lacus pellentesque volutpat non quis sem. Aliquam blandit vitae 
justo ut eleifend. Aliquam erat volutpat. Cras sed dapibus elit, eu ornare 
turpis. Maecenas ultrices aliquam nisl, nec lobortis mi tincidunt quis.
</p> */}
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
            value={`public class Solution {\n public static void main(String[] args) {\n   // Prints "Hello, World" to the terminal window.\n   System.out.println("Hello, World");\n }\n}`}
            setOptions={{
              enableBasicAutocompletion: true,
              enableLiveAutocompletion: true,
              enableSnippets: true,
              showLineNumbers: true,
              tabSize: 2,
            }}
            style={{ width: '100%', height: '100%' }}
          />
        </div>
      </div>
      <div className='footer'>
        <button type='submit'>Test Cases</button>
        <button type='submit' onClick={handleClick}>Submit Code</button>
      </div>          
    </div>
    
  );
}

export default App;
