'use client';

import React, { useRef, useState } from 'react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button'; // Assuming you have a Button component
import RegistrationSection from './registrationSection';

const ContestOverview = () => {
  const [showRegistration, setShowRegistration] = useState(false);
  const registrationRef = useRef<HTMLDivElement>(null);

  const scrollToRegistration = () => {
    setShowRegistration(true);
    setTimeout(() => {
      if (registrationRef.current) {
        registrationRef.current.scrollIntoView({ behavior: 'smooth' });
      }
    }, 0); // Ensuring scroll happens after rendering
  };

  return (
    <>
      <Card className="my-4 p-4">
        <div className="flex items-center mb-4">
          <Avatar>
            <AvatarImage src="/avatars/02.png" alt="Organizer" />
            <AvatarFallback>O</AvatarFallback>
          </Avatar>
          <div className="ml-4">
            <h1 className="text-2xl font-bold">Monthly Coding Contest</h1>
            <p className="text-gray-600">Join our monthly contest and win exciting prizes!</p>
            <Badge className="mt-2">New</Badge>
          </div>
        </div>
        <div className="space-y-4">
          <p className="text-lg">The Monthly Coding Contest is an exciting opportunity for developers to showcase their skills and compete for amazing prizes. Whether you are a beginner or an experienced coder, this contest is open to all!</p>
          <div>
            <h2 className="text-xl font-semibold">Contest Duration</h2>
            <p>The contest runs from the 1st to the 30th of every month. Winners will be announced on the 5th of the following month.</p>
          </div>
          <div>
            <h2 className="text-xl font-semibold">Participation Criteria</h2>
            <ul className="list-disc list-inside">
              <li>Open to all developers worldwide.</li>
              <li>Participants must register with a valid email address.</li>
              <li>Each participant can submit only one entry per contest.</li>
            </ul>
          </div>
          <div>
            <h2 className="text-xl font-semibold">How to Join</h2>
            <p>To join the contest, simply click on the registration button below and fill out the registration form. Make sure to read the contest rules and agree to the terms and conditions.</p>
            <Button onClick={scrollToRegistration} className="mt-2">Register Now</Button>
          </div>
        </div>
      </Card>
      {showRegistration && <RegistrationSection ref={registrationRef} />}
    </>
  );
};

export default ContestOverview;
