
import {react, useState, useEffect,useRef} from 'react';
import AceEditor from 'react-ace';
import 'ace-builds/src-noconflict/theme-monokai';
import 'ace-builds/src-noconflict/mode-java';
import 'ace-builds/src-noconflict/mode-python';
import 'ace-builds/src-noconflict/mode-c_cpp';
// Import necessary extensions
import 'ace-builds/src-noconflict/ext-language_tools'; // Include the language tools extension for autocompletion
import 'ace-builds/src-noconflict/snippets/java'; // Include the Java snippets
import 'ace-builds/src-noconflict/snippets/python'; // Include the Python snippets
import 'ace-builds/src-noconflict/snippets/c_cpp'; // Include the C++ snippets

import { useParams } from 'react-router-dom';
import { useFetchTopicsQuery } from '../../features/topics/topicsSlice';
import Loading from '../Loading/Loading';
import AIChatBot from './AIChatBot';
import TopicFooter from './TopicFooter';
import Modal from 'react-modal';
const parse = require('html-react-parser');






const TopicContent = () => {

 const id = useParams();
 
  const aceRef = useRef(null);
 
 const [AIChatBotTextArea, setAIChatBotTextArea] = useState(false);
 


 const [setCode, setCodeState] = useState(''); 


 const [isComipling, setIsComipling] = useState(false);

 const [resultMessage, setResultMessage] = useState(null);

 const [allTestCasesPassed, setAllTestCasesPassed] = useState(false);

 

 const topicID = id.topicId;
 
 let { data, error, isLoading } = useFetchTopicsQuery(topicID);
 
  if (isLoading) return <div>Loading...</div>

  if (error) return <div>{error.message}</div>

  console.log(data);
  


   


  const handleClose = () => {
    setResultMessage(null);
  }


   
  

  return (
    <>    
    <div style={{ height: "calc(90vh - 50px)", overflow: "hidden" }}>
      <div className="row h-100">
        <div className="col-md-6" style={{padding:50 , overflowY:'auto',  maxHeight: "calc(90vh - 50px)"}}>
          <h1>{data.topic.name}</h1>
          <hr />
              {AIChatBotTextArea ? (
              <AIChatBot setAIChatBotTextArea={setAIChatBotTextArea} description={data.topic.description} />  // Show the chatbot when showChatBot state is true
            ) : (
              isComipling ? (
                <Loading />
              ) : (
                resultMessage ? (
                  <div>
                    {parse(resultMessage)}<br />
                    <div className='mt-2'>
                      <button className='btn btn-info' onClick={handleClose}>Close</button>
                    </div>
                  </div>
                ) : (
                  <p>{parse(data.topic.description)}</p>
                )
              )
            )}
        </div>
        <div className="col-md-6 h-100">
            <AceEditor
              mode="java"
              theme="monokai"
              name="ace-editor-course"
              width='200%' 
              height='100%' 
              ref={aceRef}    
              fontSize={14}
              showPrintMargin={true}
              showGutter={true}
              highlightActiveLine={true}
              editorProps={{ $blockScrolling: Infinity }}
              defaultValue={`public class Main {\n public static void main(String[] args){\n System.out.println("Hello World");\n }\n}`}
              onChange={newCode => setCodeState(newCode)}
              setOptions={{
                enableBasicAutocompletion: true,
                enableLiveAutocompletion: true,
                enableSnippets: false,
                showLineNumbers: true,
                tabSize: 2,
              }} />
        </div>
      </div>
              
    </div>
    <TopicFooter setCode={setCode}  data={data} setIsComipling={setIsComipling} setResultMessage={setResultMessage} setAIChatBotTextArea={setAIChatBotTextArea}/>          
    </>
  );
}

export default TopicContent;
