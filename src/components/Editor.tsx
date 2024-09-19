import React, { useState, useEffect } from 'react';
import { Editor, loader } from '@monaco-editor/react';
import axios from 'axios';

interface CompilerProps {
  language: string;
  code: string;
  setCode: (newCode: string) => void;
}

const Compiler: React.FC<CompilerProps> = ({ language, code, setCode }) => {
  const [output, setOutput] = useState('');

  useEffect(() => {
    loader.init().then(monaco => {
      monaco.editor.defineTheme('myTheme', {
        base: 'vs-dark',
        inherit: true,
        rules: [],
        colors: {}
      });
      monaco.editor.setTheme('myTheme');
    });
  }, []);

  const handleEditorChange = (value: string | undefined) => {
    setCode(value || '');
  };

  const handleCompile = async () => {
    try {
      const response = await axios.post('http://localhost:4500/compiler/execute', {
        script: code,
        language,
      });
      setOutput(response.data.output);
    } catch (error) {
      console.error('Compilation error:', error);
      setOutput('An error occurred during compilation');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Online Code Compiler</h1>
      <div className="editor-container mb-4" style={{ height: '400px' }}>
        <Editor
          height="100%"
          language={language}
          value={code}
          onChange={handleEditorChange}
          theme="myTheme"
        />
      </div>
      <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={handleCompile}>
        Compile
      </button>
      <div className="output-container mt-4">
        <h2 className="text-xl font-bold text-black">Output:</h2>
        <pre className="bg-gray-200 p-4 rounded text-black">{output}</pre>
      </div>
    </div>
  );
};

export default Compiler;