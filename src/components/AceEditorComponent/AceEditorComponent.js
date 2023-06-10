import React, { useEffect, useRef } from 'react';
import ace from 'ace-builds';
import 'ace-builds/src-noconflict/mode-java'; // Import the Java mode
import 'ace-builds/src-noconflict/theme-monokai';
import 'ace-builds/src-noconflict/ext-language_tools';

const AceEditorComponent = () => {
  const editorRef = useRef(null);

  useEffect(() => {
    const editor = ace.edit(editorRef.current);
    editor.setTheme('ace/theme/monokai');
    editor.session.setMode('ace/mode/java'); // Set the Java mode
    editor.setOptions({
      enableBasicAutocompletion: true,
      enableLiveAutocompletion: true,
    });

    // Set the default value for the editor
    editor.setValue('public class HelloWorld {\n  public static void main(String[] args) {\n    System.out.println("Hello, World!");\n  }\n}');

    return () => {
      editor.destroy();
    };
  }, []);

  return <div ref={editorRef} style={{ width: '100%', height: '100vh' }} />;
};

export default AceEditorComponent;
