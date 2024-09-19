'use client';
import { useRef, useState, useEffect } from "react";

import { Editor, loader } from "@monaco-editor/react";
import LanguageSelector from "./LanguageSelector";
import { CODE_SNIPPETS } from "./constants";
import Output from "./Output";
import { Card } from "../ui/card";
import { cn } from "@/lib/utils";


const CodeEditor = () => {
  const editorRef = useRef();
  const [value, setValue] = useState("");
  const [language, setLanguage] = useState("javascript");

  useEffect(() => {
    loader.init().then(monaco => {
      monaco.editor.defineTheme('customTheme', {
        base: 'vs-dark',
        inherit: true,
        rules: [],
        colors: {
          "editor.background": "#1e1e1e",
        }
      });
      monaco.editor.setTheme('customTheme');
    });
  }, []);

  const onMount = (editor) => {
    editorRef.current = editor;
    editor.focus();
  };

  const onSelect = (language) => {
    setLanguage(language);
    setValue(CODE_SNIPPETS[language]);
  };

  return (
    <div className={cn('min-h-screen', 'bg-[#0f0a19]', 'text-gray-500', 'px-6')}>
      <div className={cn('space-y-4')}>
        <Card>
          <LanguageSelector language={language} onSelect={onSelect} />
          <Editor
            options={{
              minimap: {
                enabled: false,
              },
            }}
            height="60vh" // Adjusted to be more responsive
            theme="customTheme"
            language={language}
            defaultValue={CODE_SNIPPETS[language]}
            onMount={onMount}
            value={value}
            onChange={(value) => setValue(value)}
          />
        </Card>
        <Card>
          <Output editorRef={editorRef} language={language} />
        </Card>
      </div>
    </div>
  );
};

export default CodeEditor;
