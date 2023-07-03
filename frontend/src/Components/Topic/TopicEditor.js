import React, { useState } from 'react';
import AceEditor from 'react-ace';

import 'ace-builds/src-noconflict/mode-java';
import 'ace-builds/src-noconflict/theme-monokai';

const TopicEditor = ({code,setCode}) => {
 

    const onChange = (newValue) => {
        setCode(newValue);
    };

    return (
        <div className="topic-editor">
          
            <div className="ace-editor-wrapper">
                <AceEditor
                    mode="java"
                    theme="monokai"
                    onChange={onChange}
                    name="course-editor-ace"
                    editorProps={{ $blockScrolling: true }}
                    value={code}
                    width="100%"
                    height="94vh"
                />
            </div>
        </div>
    );
};

export default TopicEditor;
