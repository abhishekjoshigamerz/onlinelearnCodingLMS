import React, { useState } from 'react';
import Editor from '@monaco-editor/react';

const TopicEditor = ({code,setCode}) => {
    
    



    const onChange = (newValue) => {
        setCode(newValue);
    };

    return (
        <div className="topic-editor">
          
            <div className="ace-editor-wrapper">
                 <Editor
                        height="90vh"
                        language={languageMode}
                        value={code}
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
    );
};

export default TopicEditor;
