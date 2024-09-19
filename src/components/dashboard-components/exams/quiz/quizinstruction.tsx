"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const QuizInstructions = ({ onStartQuiz }: { onStartQuiz: () => void }) => {
  return (
    <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
        <Card className="border-[0.5vmin] border-primary mb-4 mr-3 bg-primary shadow-[0.4rem_0.4rem_] shadow-primary transition-shadow duration-300 hover:shadow-[0.6rem_0.6rem_] hover:shadow-primary">
        <CardHeader>
        <CardTitle>
            <h1 className="text-3xl font-brenet-regular font-bold mb-4">Quiz Instructions</h1>
         </CardTitle>   
         </CardHeader>
         <CardContent className="bg-background overflow-auto text-secondary-foreground">
        <ul className="list-disc  list-inside mb-4">
          <li>Read each question carefully before answering.</li>
          <li>You can mark questions for review and revisit them later.</li>
          <li>There is a time limit of 1 hour for the entire quiz.</li>
          <li>Click the "Submit" button once you have completed the quiz.</li>
        </ul>
        <Button className="bg-primary text-white" onClick={onStartQuiz}>
          Start Quiz
        </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default QuizInstructions;
