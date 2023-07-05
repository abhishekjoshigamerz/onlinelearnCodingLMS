import React from "react";
import Editor from "@monaco-editor/react";

function MonacoTesting() {
  const handleEditorChange = (value, event) => {
    // here we can handle editor changes
  };

  return (
    <div className="App">
      <Editor
        height="90vh" // By default, it fully fits with its parent
        theme="vs-dark"
        defaultLanguage="javascript"
        defaultValue="// some comment"
        onChange={handleEditorChange}
      />
    </div>
  );
}

export default MonacoTesting;
