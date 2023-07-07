
import {react, useState, useEffect,useRef} from 'react';
import Editor from '@monaco-editor/react';

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
            <Editor
                        height="90vh"
                        language="java"
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
    <TopicFooter setCode={setCode}  data={data} setIsComipling={setIsComipling} setResultMessage={setResultMessage} setAIChatBotTextArea={setAIChatBotTextArea}/>          
    </>
  );
}

export default TopicContent;
