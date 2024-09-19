'use client';
import { useState } from "react";
import { executeCode } from "./api";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { Label } from "../ui/label";


const Output = ({ editorRef, language }) => {
  const [output, setOutput] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const runCode = async () => {
    const sourceCode = editorRef.current.getValue();
    if (!sourceCode) return;
    try {
      setIsLoading(true);
      const { run: result } = await executeCode(language, sourceCode);
      setOutput(result.output.split("\n"));
      result.stderr ? setIsError(true) : setIsError(false);
    } catch (error) {
      console.log(error);
      setIsError(true);
      setOutput([`An error occurred: ${error.message || "Unable to run code"}`]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full md:w-1/2">
      <Label className="mb-2 text-lg">Output</Label>
      <Button
        variant="outline"
        className="text-green-500 border-green-500 mb-4"
        isLoading={isLoading}
        onClick={runCode}
      >
        Run Code
      </Button>
      {isError && (
        <Alert variant="error" className="mb-4">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{output && output[0]}</AlertDescription>
        </Alert>
      )}
      <Card className={`h-40vh p-2 ${isError ? "text-red-400 border-red-500" : "border-gray-300"}`} border="1px solid" borderRadius="4">
        {output && !isError
          ? output.map((line, i) => <p key={i}>{line}</p>)
          : !isError && 'Click "Run Code" to see the output here'}
      </Card>
    </div>
  );
};

export default Output;
