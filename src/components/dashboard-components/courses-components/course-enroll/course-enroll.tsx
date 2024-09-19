'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@radix-ui/react-accordion';
import { ChevronDown, Star, DollarSign } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from '@/components/ui/tooltip';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { motion, useViewportScroll, useTransform } from "framer-motion";
import Link from 'next/link';
import userInfo from '@/hooks/userInfo';
import axios from 'axios';

interface CourseEnrollProps {
  course: {
    courseName: string;
    courseId: string;
    description: string;
    courseImage: string;
    courseDuration: string;
    courseCategory: string;
    difficulty: string;
    chapters: { chapterName: string; content: string; topics: { topicName: string; topicType: string; topicContent: string[] }[] }[];
    format: string;
    courseReviews: {
      userAvatar: string | undefined; rating: number; comment: string
    }[];
    certificates: boolean;
    faqs: { question: string; answer: string }[];
    media: string[];
  };
}

const CourseEnroll: React.FC<CourseEnrollProps> = ({ course }) => {
  const {
    courseName,
    description,
    courseImage,
    courseDuration,
    courseCategory,
    courseId,
    difficulty,
    chapters = [],
    format = '',
    courseReviews = [],
    certificates = false,
    faqs = [],
    media = [],
  } = course;

  const username = userInfo((state) => state.username);
  const averageRating = courseReviews.reduce((acc, review) => acc + review.rating, 0) / courseReviews.length;
  const [openIndices, setOpenIndices] = useState<Set<number>>(new Set());
  const [isEnrolled, setIsEnrolled] = useState(false);
  const { toast } = useToast();
  const { scrollY } = useViewportScroll();
  const stickyPosition = useTransform(scrollY, [0, 100], ["relative", "fixed"]);
  const tabs = ['About', 'Curriculum', 'Reviews', 'FAQs'];
  const [activeTab, setActiveTab] = useState(tabs[0].toLowerCase());

  const toggleAccordion = (index: number) => {
    const newOpenIndices = new Set(openIndices); // Create a new set to avoid mutating state directly
    if (newOpenIndices.has(index)) {
      newOpenIndices.delete(index); // If the item is already open, remove it from the set
    } else {
      newOpenIndices.add(index); // If the item is closed, add it to the set
    }
    setOpenIndices(newOpenIndices); // Update the state with the new set
  };

  const sectionRefs = useRef<{ [key: string]: HTMLDivElement | null }>({
    about: null,
    curriculum: null,
    reviews: null,
    faqs: null,
  });

  const handleScroll = (tab: string) => {
    sectionRefs.current[tab]?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveTab(entry.target.id);
        }
      });
    };

    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.3,
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    const sections = Object.values(sectionRefs.current);
    sections.forEach(section => {
      if (section) observer.observe(section);
    });

    return () => {
      sections.forEach(section => {
        if (section) observer.unobserve(section);
      });
    };
  }, []);

  const checkEnrollment = async () => {
    try {
      console.log("checkEnrollment ", { username, courseId });
      const response = await axios.post('http://localhost:4500/developer/checkEnrollment', { username, courseId },
        {
          withCredentials: true,
        }
      );
      setIsEnrolled(response.data.isEnrolled);
    } catch (error) {
      console.error('Error checking enrollment:', error);
    }
  };

  const handleEnroll = async () => {
    try {
      console.log("enrollCourse ", { username, courseId });
      await axios.post('http://localhost:4500/developer/enrollCourse', { username, courseId },
        {
          withCredentials: true,
        });
      setIsEnrolled(true);
      toast({ title: "Enrolled", description: `You have successfully enrolled in ${courseName}!` });
    } catch (error) {
      console.error('Error enrolling in course:', error);
      toast({ title: "Error", description: "Failed to enroll in the course" });
    }
  };

  useEffect(() => {
    if (username) {
      checkEnrollment();
    }
  }, [username]);

  console.log("course", course, username);

  return (
    <TooltipProvider>
      <motion.div className={`flex flex-col gap-8 bg-card-light`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
        {/* Course Header */}
        <motion.div className="shadow-lg rounded-lg overflow-hidden bg-secondary  relative" initial={{ y: -50 }} animate={{ y: 0 }} transition={{ duration: 0.5 }}>
          <div className="flex flex-col md:flex-row">
            <img src={courseImage} alt={courseName} className="w-full md:w-1/3 object-cover" />
            <CardContent className="flex-1 p-6">
              <CardHeader>
                <CardTitle className="text-3xl leading-tight font-brenet-regular text-primary mb-4">{courseName}</CardTitle>
              </CardHeader>
              <motion.p className="text-lg font-bequest text-muted-foreground mb-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
                {description}
              </motion.p>
              <div className="flex items-center space-x-4 mb-4">
                <Tooltip>
                  <TooltipTrigger>
                    <span className="text-sm font-bequest bg-blue-100 text-blue-800 px-2 py-1 rounded cursor-pointer">{courseCategory}</span>
                  </TooltipTrigger>
                  <TooltipContent className="p-2 font-bequest bg-primary text-white rounded shadow-lg">
                    More information about the course category
                  </TooltipContent>
                </Tooltip>
                <Tooltip>
                  <TooltipTrigger>
                    <span className="text-sm font-bequest bg-green-100 text-green-800 px-2 py-1 rounded cursor-pointer">{difficulty}</span>
                  </TooltipTrigger>
                  <TooltipContent className="p-2 bg-primary text-white rounded shadow-lg">
                    This indicates the difficulty level of the course
                  </TooltipContent>
                </Tooltip>
                <span className="text-sm font-inter font-bold text-muted-foreground">{courseDuration}</span>
              </div>
              <div className="flex items-center font-bold space-x-2 mb-4">
                <Tooltip>
                  <TooltipTrigger>
                    <span className="flex items-center text-yellow-500 cursor-pointer">
                      <Star className="w-5 h-5" /> {averageRating.toFixed(1)}
                    </span>
                  </TooltipTrigger>
                  <TooltipContent className="p-2 font-bequest bg-gray-800 text-white rounded shadow-lg">
                    Average rating based on {courseReviews.length} reviews.
                  </TooltipContent>
                </Tooltip>
                <span className="text-inter text-muted-foreground">({courseReviews.length} reviews)</span>
              </div>
            </CardContent>
            {/* Enrollment Section */}
            <motion.div
              className="lg:w-1/4 lg:sticky lg:top-20 right-0"
              style={{ position: stickyPosition }}
              initial={{ x: 50 }}
              animate={{ x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <div className="sticky top-0">
                <motion.div className="shadow-lg rounded-lg overflow-hidden bg-card p-6" initial={{ scale: 0.8 }} animate={{ scale: 1 }} transition={{ delay: 0.4 }}>
                  {isEnrolled ? (
                    <>
                      <h2 className="text-xl font-brenet-regular mb-4 text-primary">Your Progress</h2>
                      <Progress />
                      <Link href={`/dashboard/courses/chapter-island/${courseId}`} passHref>
                        <motion.div
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="mt-auto"
                        >
                          <Button className="text-lg font-semibold font-bequest text-primary-foreground bg-primary py-2 px-4 rounded hover:bg-primary-dark transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary self-stretch">
                            View Course
                          </Button>
                        </motion.div>
                      </Link>
                    </>
                  ) : (
                    <>
                      <h2 className="text-xl font-brenet-regular mb-4 text-primary">Enroll in this Course</h2>
                      <div className="flex items-center space-x-4 mb-4">
                        <DollarSign className="w-6 h-6 text-green-500" />
                        <span className="text-2xl font-inter font-bold text-foreground">$99.99</span>
                      </div>
                      <Button onClick={handleEnroll} className="bg-gradient-to-r from-primary to-primary-foreground text-white px-4 py-2 rounded w-full hover:shadow-lg transition-shadow duration-300">Enroll Now</Button>
                    </>
                  )}
                </motion.div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Tabs Navigation */}
        <motion.div className="top-0 lg:w-1/4 bg-background z-10 my-8" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
          <Tabs value={activeTab} onValueChange={handleScroll}>
            <TabsList className="flex border-b border-muted bg-background shadow-md">
              {tabs.map((tab, index) => (
                <TabsTrigger
                  key={index}
                  value={tab.toLowerCase()}
                  className={`py-2.5 px-4 text-sm font-bequest font-medium leading-5 transition-colors duration-150 ${activeTab === tab.toLowerCase() ? 'border-b-2 -mb-px border-primary text-primary bg-secondary text-white' : 'text-muted-foreground'
                    }`}>
                  {tab}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </motion.div>

        {/* About Section */}
        <motion.div id="about" ref={(el) => { sectionRefs.current.about = el; }} className="my-8 p-4 bg-secondary rounded-lg shadow" initial={{ y: 50 }} animate={{ y: 0 }} transition={{ delay: 0.6 }}>
          <h2 className="text-2xl font-brenet-regular mb-4 text-primary">About</h2>
          <p className="font-inter text-accent-foreground">{description}</p>
        </motion.div>

        {/* Curriculum Section */}
        <motion.div
          id="curriculum"
          ref={(el) => { sectionRefs.current.curriculum = el; }}
          className="my-8 p-4 bg-background rounded-lg shadow"
          initial={{ y: 50 }}
          animate={{ y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <h2 className="text-2xl font-brenet-regular mb-4 text-primary">Curriculum</h2>
          <div className="border rounded-md overflow-hidden shadow-sm bg-background">
            <Accordion type="single">
              {chapters.map((chapter, index) => (
                <AccordionItem key={index} value={`chapter-${index}`} className="border-b">
                  <AccordionTrigger
                    className="flex justify-between w-full items-center font-brenet-regular p-4 bg-muted hover:bg-muted-foreground transition-colors"
                    onClick={() => toggleAccordion(index)}
                  >
                    {chapter.chapterName} <ChevronDown className={`w-4 h-4 ${openIndices.has(index) ? 'rotate-180' : ''}`} />
                  </AccordionTrigger>
                  <AccordionContent className="p-4" style={{ display: openIndices.has(index) ? "block" : "none" }}>
                    <ul className="list-disc pl-6">
                      {chapter.topics.map((topic, i) => (
                        <li key={i} className="mb-2">
                          <strong>{topic.topicName}</strong>
                        </li>
                      ))}
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </motion.div>

        {/* Reviews Section */}
        <motion.div
          id="reviews"
          ref={(el) => { sectionRefs.current.reviews = el; }}
          className="my-8 p-4 bg-secondary rounded-lg shadow"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <h2 className="text-2xl font-brenet-regular mb-4 text-primary">Reviews</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {courseReviews.map((review, index) => (
              <motion.div
                key={index}
                className="p-4 border rounded-lg bg-background shadow-md"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="flex items-center mb-2">
                  {review.userAvatar ? (
                    <img src={review.userAvatar} alt="User Avatar" className="w-10 h-10 rounded-full mr-3" />
                  ) : (
                    <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center text-gray-600 mr-3">
                      No
                    </div>
                  )}
                  <div className="text-sm font-bold text-primary flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`text-primary ${i >= review.rating ? 'opacity-50' : ''}`}
                      />
                    ))}
                  </div>
                </div>
                <p className="font-bequest text-accent-foreground">{review.comment}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* FAQs Section */}
        <motion.div
          id="faqs"
          ref={(el) => { sectionRefs.current.faqs = el; }}
          className="my-8 p-4 bg-background rounded-lg shadow"
          initial={{ y: 50 }}
          animate={{ y: 0 }}
          transition={{ delay: 0.9 }}
        >
          <h2 className="text-2xl font-brenet-regular mb-4 text-primary">FAQs</h2>
          <div className="border rounded-md overflow-hidden shadow-sm bg-background">
            <Accordion type="single">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`faq-${index}`} className="border-b">
                  <AccordionTrigger
                    className="flex justify-between font-bequest w-full items-center p-4 bg-muted hover:bg-muted-foreground transition-colors"
                    onClick={() => toggleAccordion(index)}
                  >
                    {faq.question} <ChevronDown className={`w-4 h-4 ${openIndices.has(index) ? 'rotate-180' : ''}`} />
                  </AccordionTrigger>
                  <AccordionContent className="p-4" style={{ display: openIndices.has(index) ? "block" : "none" }}>
                    <p className="font-inter">{faq.answer}</p>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </motion.div>
      </motion.div>
    </TooltipProvider>
  );
};

export default CourseEnroll;