"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { AiFillClockCircle } from "react-icons/ai";
import { MdQuestionAnswer, MdCode, MdShortText } from "react-icons/md";
import CodeEditor from "@/components/editor/CodeEditor";
import QuizInstructions from "./quizinstruction";


interface Question {
  type: "multiple-choice" | "coding" | "short-answer";
  question: string;
  options?: string[];
  answer?: string;
  language?: string;
}

const ChapterQuiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<(string | null)[]>(Array(3).fill(null));
  const [timeLeft, setTimeLeft] = useState(3600); // 1 hour timer
  const [markedForReview, setMarkedForReview] = useState<boolean[]>(Array(3).fill(false));
  const [showInstructions, setShowInstructions] = useState(true);

  const questions: Question[] = [
    { type: "multiple-choice", question: "What is 2 + 2?", options: ["3", "4", "5"], answer: "4" },
    { type: "coding", question: "Write a function to add two numbers.", language: "javascript" },
    { type: "short-answer", question: "What is the capital of France?", answer: "Paris" },
  ];

  useEffect(() => {
    if (!showInstructions) {
      const timer = setInterval(() => {
        setTimeLeft((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [showInstructions]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const prevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const markForReview = () => {
    const updatedMarkedForReview = [...markedForReview];
    updatedMarkedForReview[currentQuestion] = !updatedMarkedForReview[currentQuestion];
    setMarkedForReview(updatedMarkedForReview);
  };

  const handleAnswerChange = (answer: string) => {
    const updatedAnswers = [...answers];
    updatedAnswers[currentQuestion] = answer;
    setAnswers(updatedAnswers);
  };

  const calculateProgress = () => {
    const answeredQuestions = answers.filter((answer) => answer !== null).length;
    return (answeredQuestions / questions.length) * 100;
  };

  const startQuiz = () => {
    setShowInstructions(false);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <AnimatePresence>
        {showInstructions ? (
          <motion.div
            key="instructions"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <QuizInstructions onStartQuiz={startQuiz} />
          </motion.div>
        ) : (
          <motion.div
            key="quiz"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <header className="flex justify-between items-center p-4 shadow-md rounded-lg bg-primary">
              <h1 className="text-3xl font-brenet-regular font-bold">Chapter Quiz</h1>
              <div className="flex items-center space-x-4">
                <div className="text-lg font-brenet-outline text-background font-semibold">
                  <AiFillClockCircle className="inline-block mr-2" />
                  Time Left: {formatTime(timeLeft)}
                </div>
                <Button className="bg-background font-brenet-regular text-primary" onClick={() => alert("Quiz Submitted!")}>
                  Submit
                </Button>
              </div>
            </header>
            <main className="mt-6 grid grid-cols-12 gap-6">
              <div className="col-span-8">
                <Card className="p-6 shadow-lg rounded-lg bg-white relative overflow-hidden min-h-[400px] bg-card text-card-foreground">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentQuestion}
                      initial={{ opacity: 0, x: 100 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -100 }}
                      transition={{ duration: 0.5 }}
                    >
                      <div>
                        <h2 className="text-xl font-brenet-regular font-semibold flex items-center">
                          {questions[currentQuestion].type === "multiple-choice" && <MdQuestionAnswer className="mr-2" />}
                          {questions[currentQuestion].type === "coding" && <MdCode className="mr-2" />}
                          {questions[currentQuestion].type === "short-answer" && <MdShortText className="mr-2" />}
                          Q{currentQuestion + 1}: {questions[currentQuestion].type.replace("-", " ").replace(/\b\w/g, (char) => char.toUpperCase())}
                        </h2>
                        <p className="mt-4">{questions[currentQuestion].question}</p>
                        {questions[currentQuestion].type === "multiple-choice" && (
                          <div className="mt-4 space-y-2">
                            {questions[currentQuestion].options?.map((option, index) => (
                              <button
                                key={index}
                                className={`w-full py-2 px-4 rounded-lg text-left ${
                                  answers[currentQuestion] === option ? "bg-primary" : "bg-secondary"
                                }`}
                                onClick={() => handleAnswerChange(option)}
                              >
                                {option}
                              </button>
                            ))}
                          </div>
                        )}
                        {questions[currentQuestion].type === "short-answer" && (
                          <Input
                            className="mt-4"
                            placeholder="Your answer"
                            value={answers[currentQuestion] || ""}
                            onChange={(e) => handleAnswerChange(e.target.value)}
                          />
                        )}
                        {questions[currentQuestion].type === "coding" && (
                          <div className="mt-4">
                            <CodeEditor />
                          </div>
                        )}
                      </div>
                    </motion.div>
                  </AnimatePresence>
                  <div className="flex font-brenet-regular justify-between mt-4">
                    <Button className="bg-primary" onClick={prevQuestion} disabled={currentQuestion === 0}>
                      Previous
                    </Button>
                    <div className="flex space-x-4">
                      <Button className={`bg-${markedForReview[currentQuestion] ? "orange" : "primary"}`} onClick={markForReview}>
                        {markedForReview[currentQuestion] ? "Unmark Review" : "Mark for Review"}
                      </Button>
                      <Button className="bg-primary" onClick={nextQuestion} disabled={currentQuestion === questions.length - 1}>
                        Next
                      </Button>
                    </div>
                  </div>
                </Card>
                <div className="mt-4">
                  <div className="bg-gray-300 rounded-full h-4 overflow-hidden">
                    <div
                      className="bg-primary h-full rounded-full transition-all"
                      style={{ width: `${calculateProgress()}%` }}
                    />
                  </div>
                </div>
              </div>
              <div className="col-span-4">
                <Card className="p-6 shadow-lg rounded-lg bg-white relative overflow-hidden bg-card text-card-foreground">
                  <h2 className="text-xl font-bequest font-semibold mb-4">Questions</h2>
                  <div className="grid grid-cols-4 gap-2">
                    {questions.map((_, index) => (
                      <div
                        key={index}
                        className={`p-2 rounded-lg cursor-pointer text-center font-semibold ${
                          answers[index] ? "bg-green-500 text-white" : markedForReview[index] ? "bg-orange-500 text-white" : currentQuestion === index ? "bg-primary" : "bg-gray-300 text-gray-700"
                        }`}
                        onClick={() => setCurrentQuestion(index)}
                      >
                        {index + 1}
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 font-bequest">
                    <h3 className="text-lg font-semibold">Milestones</h3>
                    <ul className="list-disc list-inside">
                      <li>Answer all questions</li>
                      <li>Mark for review</li>
                      <li>Submit quiz</li>
                    </ul>
                  </div>
                </Card>
              </div>
            </main>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ChapterQuiz;

