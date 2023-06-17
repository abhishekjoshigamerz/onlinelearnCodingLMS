//write me for the practice IDE
import {react, useState, useEffect} from 'react';
import './PracticeIDE.css';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import AceEditorComponent from '../AceEditorComponent/AceEditorComponent';
const PracticeIDE = () => {

    const [code, setCode] = useState("");
    const [output,setOutput] = useState(null);

    useEffect(() => {
        try {
          // your code here...
        } catch (error) {
          console.error(error);
        }
      }, []);

    return (
        <div>
            <Header />
            <div className="practice-ide">
                    <div className="practice-ide-text">
                        <h1>Practice IDE</h1>
                        <p>Practice your coding skills with our online IDE using Java Programming language and DSA. Please know that at present we are not capable of database connections,networking programs and taking custom inputs from users so for programs you will have to hard code inputs.</p>
                        <p>Output:</p>
                        <p className='output'></p>
                    </div>
                    <div className="ace-editor">
                        <AceEditorComponent code={code} setCode={setCode}/>
                    </div>
            </div>

            <Footer />
        </div>

    );
    }

export default PracticeIDE;