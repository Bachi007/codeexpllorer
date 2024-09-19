'use client'
import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import axios from 'axios';
import { courses as staticCourses } from '../../course-constants';
import ChapterIsland from '@/components/dashboard-components/courses-components/chapter-island/chapter-island';

const ChapterIslandPage = () => {
  const params = useParams();
  const courseId = typeof params.courseId === 'string' ? params.courseId : '';
  const [course, setCourse] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Function to set the course data when the backend is not available
  const setStaticCourse = (courseId: string) => {
    const staticCourse = staticCourses.find(course => course.courseId === courseId);
    if (staticCourse) {
      setCourse(staticCourse);
      setLoading(false);
    } else {
      setError('Course not found');
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        console.log(courseId);
        const response = await axios.get(`http://localhost:4500/courses/getCourse/${courseId}`, {
          withCredentials: true,
        });
        console.log(`getCourse/${courseId}: `, response.data);
        setCourse(response.data);
        setLoading(false);
      } catch (err) {
        // If backend is not available, set the static course
        setStaticCourse(courseId);
      }
    };

    fetchCourse();
  }, [courseId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error || !course) {
    return <div>{error || 'Course not found'}</div>;
  }

  // console.log(course);
  return <ChapterIsland course={course} />;
};

export default ChapterIslandPage;