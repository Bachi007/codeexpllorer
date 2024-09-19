import { Progress } from '@/components/ui/progress';
import React from 'react';


const CountdownTimer = () => (
  <Progress value={50} max={100} className="my-4" />
);

export default CountdownTimer;
