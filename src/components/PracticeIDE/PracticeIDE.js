import {React , useState ,useEffect} from 'react';
import Header from "../Header/Header";
import AceEditorComponent from "../AceEditorComponent/AceEditorComponent";
import Footer from "./PracticeIDEFooter";
import './PracticeIDE.css';
const PracticeIDE = () => {
    const [code, setCode] = useState('');
    const [output,setOutput] = useState(null);
  

    return (
        <div>
            <Header />
                <div className="container">
                    <div className = "practice-ide-text">
                        <h1>Practice IDE</h1>
                        <p>Practice your coding skills with our online IDE. Choose from a variety of languages and start coding!</p>
                        <p>Output</p>
                        <div className = "practice-ide-output">
                            
                        {output ? (
                            <div>
                              <pre>{output}</pre>
                            </div>
                        ) : ("")}

                        </div>
                    </div>
                    <div className = "practice-ide-iframe">
                        <AceEditorComponent code={code} setCode={setCode} />
                    </div>
                </div>

            <Footer code={code}  output={output} setOutput={setOutput} />
        </div>
    );
}

export default PracticeIDE;