'use client';
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "@/components/ui/resizable";
import Compiler from "@/components/Editor";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Chat from "./chatbox";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

interface Challenge {
  description: string;
  language: string;
  code: string;
}

const initialChallenge = {
  description: "Solve the coding problem",
  language: "javascript",
  code: "// Start coding here",
};

interface StaticLobbyProps {
  roomName: string;
}

const StaticLobby: React.FC<StaticLobbyProps> = ({ roomName }) => {
  const [challenge, setChallenge] = useState<Challenge | null>(initialChallenge);
  const [timer, setTimer] = useState(600); // 10 minutes timer
  const [isChatOpen, setIsChatOpen] = useState(false);

  // Timer logic
  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prevTimer) => (prevTimer > 0 ? prevTimer - 1 : 0));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white p-8 flex flex-col items-center relative">
      <motion.div
        className="text-center mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 100 }}
      >
        <h2 className="text-4xl font-bold">Lobby {roomName}</h2>
        <div className="flex justify-center items-center mt-4">
          <Badge className="mr-4">Time Left: {formatTime(timer)}</Badge>
          <Progress value={(timer / 600) * 100} className="w-40" />
        </div>
      </motion.div>

      <ResizablePanelGroup direction="horizontal" className="flex-grow w-full max-w-screen-xl gap-4">
        <ResizablePanel defaultSize={40} minSize={35} className="bg-gray-800 p-4 rounded-lg flex flex-col shadow-lg">
          {challenge && (
            <motion.div
              className="w-full h-full flex flex-col"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Card className="w-full h-full bg-gray-800 text-white rounded-lg shadow-md">
                <CardHeader>
                  <h3 className="text-2xl font-semibold">Challenge</h3>
                </CardHeader>
                <CardContent>
                  <p>{challenge.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </ResizablePanel>

        <ResizableHandle />

        <ResizablePanel defaultSize={60} minSize={55} className="bg-gray-900 p-4 rounded-lg flex flex-col shadow-lg">
          {challenge && (
            <motion.div
              className="w-full h-full flex flex-col"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Card className="w-full h-full bg-gray-900 text-white rounded-lg shadow-md">
                <CardHeader>
                  <h3 className="text-2xl font-semibold">Online Code Compiler</h3>
                </CardHeader>
                <CardContent className="flex-grow">
                  <Compiler
                    language={challenge.language}
                    code={challenge.code}
                    setCode={(newCode: string) =>
                      setChallenge((prevChallenge) =>
                        prevChallenge ? { ...prevChallenge, code: newCode } : null
                      )
                    }
                  />
                </CardContent>
                <CardFooter>
                  <Button>Compile</Button>
                </CardFooter>
              </Card>
            </motion.div>
          )}
        </ResizablePanel>
      </ResizablePanelGroup>

      <motion.div
        className={`absolute bottom-4 right-4 ${isChatOpen ? 'w-full max-w-screen-xl' : 'w-16 h-16'}`}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Button variant="ghost" onClick={() => setIsChatOpen(!isChatOpen)}>
          {isChatOpen ? 'Close Chat' : 'Open Chat'}
        </Button>
        {isChatOpen && (
            <Chat roomName={roomName} />
      
        )}
      </motion.div>
    </div>
  );
};

export default StaticLobby;
