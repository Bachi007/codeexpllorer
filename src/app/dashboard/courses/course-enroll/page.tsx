// src/app/dashboard/courses/course-enroll/page.tsx
'use client'; // Mark this file as a Client Component

import React from 'react';
import { useSearchParams } from 'next/navigation';

const CourseEnroll = () => {
  const searchParams = useSearchParams();
  const courseId = searchParams.get('courseId');

  if (!courseId) {
    return <div>No Course Selected</div>;
  }

  return <div>Select a course to view its details</div>;
};

export default CourseEnroll;
