import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'next/navigation';
import { courses as staticCourses } from '@/app/dashboard/courses/course-constants';
import { TabsList, TabsTrigger, Tabs, TabsContent } from '@/components/ui/tabs';
import { Pagination, PaginationContent, PaginationItem, PaginationLink } from '@/components/ui/pagination';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import ChapterQuiz from '@/components/dashboard-components/exams/quiz/chapterquiz';
import topicContent from './topiccontent';
import Compiler from '@/components/Editor';
import { ChevronLeft, ChevronRight } from 'lucide-react';

// Define types for the props and state variables
type NavigationButtonProps = {
  direction: 'prev' | 'next';
  onClick: () => void;
  disabled: boolean;
};

type Course = {
  courseName: string;
  description: string;
  courseImage: string;
  courseId: string;
  courseDuration: string;
  courseRating: number;
  courseCategory: string;
  difficulty: string;
  courseTags: string[];
  chapters: Chapter[];
  media: string[];
};

type Chapter = {
  chapterName: string;
  topics: Topic[];
};

type Topic = {
  topicName: string;
  content: string;
};

type TopicContent = {
  story: string;
  introduction: string;
  mainStory: string;
  interactiveElements: {
    question: string;
    codingExercise: string;
    decisionPoint: string;
    debuggingScenario: string;
  };
  conclusion: string;
  whatDidYouLearn: string[];
  challenge: string;
  nextStep: string;
};

const NavigationButton = ({ direction, onClick, disabled }: NavigationButtonProps) => (
  <Button
    onClick={onClick}
    disabled={disabled}
    className={`
      flex items-center justify-center
      w-12 h-12 rounded-full
      bg-primary text-primary-foreground
      hover:bg-secondary transition-all duration-300
      shadow-lg hover:shadow-xl
      ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
      ${direction === 'next' ? 'ml-auto' : ''}
    `}
  >
    {direction === 'prev' ? <ChevronLeft size={24} /> : <ChevronRight size={24} />}
  </Button>
);

const CourseContent = ({ chapterId, courseId }: { chapterId: string; courseId: string }) => {
  const params = useParams();
  const courseParamId = typeof params.courseId === 'string' ? params.courseId : courseId;

  const [currentPage, setCurrentPage] = useState<number>(0);
  const [quiz, setQuiz] = useState<boolean>(false);
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [code, setCode] = useState<string>(topicContent.interactiveElements.codingExercise);
  const [contentStage, setContentStage] = useState<string>('story');

  const transformStaticCourse = (staticCourse: any): Course => {
    return {
      ...staticCourse,
      chapters: staticCourse.chapters.map((chapter: any) => ({
        ...chapter,
        topics: chapter.topics.map((topic: any) => ({
          topicName: topic.topicName,
          content: topic.topicContent.join('\n'),
        })),
      })),
    };
  };

  const setStaticCourse = (courseId: string) => {
    const staticCourse = staticCourses.find(course => course.courseId === courseId);
    if (staticCourse) {
      setCourse(transformStaticCourse(staticCourse));
      setLoading(false);
    } else {
      setError('Course not found');
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await axios.get(`http://localhost:4500/courses/getCourse/${courseParamId}`, {
          withCredentials: true,
        });
        setCourse(response.data);
        setLoading(false);
      } catch (err) {
        setStaticCourse(courseParamId);
      }
    };

    fetchCourse();
  }, [courseParamId]);

  const paginate = (index: number) => {
    if (course) {
      setCurrentPage(index);
    }
  };

  const handleQuiz = () => {
    setQuiz(true);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error || !course) {
    return <div>{error || 'Course not found'}</div>;
  }

  const stages = ['story', 'interactive', 'conclusion'];
  const currentIndex = stages.indexOf(contentStage);

  const renderTopicContent = (content: TopicContent) => (
    <div className="p-8 font-inter bg-background text-foreground relative">
      {contentStage === 'story' && (
        <>
          <div className="mb-8 border-b-2 border-border pb-4">
            <h2 className="text-4xl font-bold text-primary font-brenet-outline">The Web Wizard's Apprentice</h2>
            <p className="text-xl mt-4 italic font-bequest">{content.story}</p>
          </div>
          
          <div className="mb-8">
            <h3 className="text-3xl font-bold text-secondary font-brenet-outline flex items-center">
              <span className="mr-2">🧙‍♂️</span> Introduction
            </h3>
            <p className="text-lg mt-4 leading-relaxed">{content.introduction}</p>
          </div>
          
          <div className="mb-8">
            <h3 className="text-3xl font-bold text-accent font-brenet-outline flex items-center">
              <span className="mr-2">📜</span> The Journey Begins
            </h3>
            <p className="text-lg mt-4 leading-relaxed">{content.mainStory}</p>
          </div>

        </>
      )}

      {contentStage === 'interactive' && (
        <>
          <h3 className="text-3xl font-bold text-primary font-brenet-outline flex items-center mb-6">
            <span className="mr-2">🔮</span> Magical Challenges
          </h3>
          <div className="bg-card text-card-foreground rounded-lg p-6 shadow-lg space-y-6">
            <div>
              <span className="text-2xl mr-2">💬</span>
              <span className="text-xl font-brenet-regular"><strong>Question:</strong> {content.interactiveElements.question}</span>
            </div>
            <div>
              <span className="text-2xl mr-2">💻</span>
              <div>
                <strong className="font-brenet-regular">Coding Spell:</strong>
                <Compiler language="html" code={code} setCode={setCode} />
              </div>
            </div>
            <div>
              <span className="text-2xl mr-2">🔍</span>
              <div>
                <strong className="font-brenet-regular">Choose Your Path:</strong> {content.interactiveElements.decisionPoint}
                <div className="flex gap-4 mt-4">
                  <Button className="bg-primary text-primary-foreground py-2 px-6 rounded-full hover:bg-secondary transition-colors">Hobby</Button>
                  <Button className="bg-accent text-accent-foreground py-2 px-6 rounded-full hover:bg-muted transition-colors">School Project</Button>
                </div>
              </div>
            </div>
            <div>
              <span className="text-2xl mr-2">🐞</span>
              <div>
                <strong className="font-brenet-regular">Debug the Spell:</strong>
                <pre className="bg-muted p-4 rounded-lg mt-2 font-mono">{content.interactiveElements.debuggingScenario}</pre>
                <Compiler language="html" code="<html><body><h1>Hello, world!</h1></body></html>" setCode={setCode} />
              </div>
            </div>
          </div>

         
        </>
      )}

      {contentStage === 'conclusion' && (
        <>
          <div className="mb-8">
            <h3 className="text-3xl font-bold text-destructive font-brenet-outline flex items-center">
              <span className="mr-2">🏆</span> The Journey's End
            </h3>
            <p className="text-lg mt-4 leading-relaxed">{content.conclusion}</p>
          </div>
          
          <div className="mb-8">
            <h3 className="text-3xl font-bold text-secondary font-brenet-outline flex items-center">
              <span className="mr-2">📚</span> Magical Knowledge Gained
            </h3>
            <ul className="list-disc list-inside mt-4 text-lg space-y-2">
              {content.whatDidYouLearn.map((item, index) => (
                <li key={index} className="text-muted-foreground">{item}</li>
              ))}
            </ul>
          </div>
          
          <div className="mb-8">
            <h3 className="text-3xl font-bold text-accent font-brenet-outline flex items-center">
              <span className="mr-2">⚔️</span> Your Quest
            </h3>
            <p className="text-lg mt-4 leading-relaxed">{content.challenge}</p>
          </div>
          
          <div>
            <h3 className="text-3xl font-bold text-primary font-brenet-outline flex items-center">
              <span className="mr-2">🗺️</span> The Path Ahead
            </h3>
            <p className="text-lg mt-4 leading-relaxed">{content.nextStep}</p>
          </div>
        </>
      )}

      <div className="flex justify-between items-center mt-8">
        <NavigationButton
          direction="prev"
          onClick={() => setContentStage(stages[currentIndex - 1])}
          disabled={currentIndex === 0}
        />
        
      

        <NavigationButton
          direction="next"
          onClick={() => setContentStage(stages[currentIndex + 1])}
          disabled={currentIndex === stages.length - 1}
        />
      </div>
    </div>
  );

  return (
    <div className="max-h-full h-full w-full">
      <Tabs>
        <TabsList className="overflow-hidden">
          {course.chapters.map((chapter) => (
            <TabsTrigger key={chapter.chapterName} className="mr-10 font-brenet-regular bg-transparent text-3xl" value={chapter.chapterName}>
              {chapter.chapterName}
            </TabsTrigger>
          ))}
        </TabsList>
        {quiz ? (
          <ChapterQuiz />
        ) : (
          course.chapters.map((chapter) => (
            <TabsContent key={chapter.chapterName} className="rounded-sm" value={chapter.chapterName}>
              <Card className="border-[0.5vmin] border-primary mb-4 mr-3 bg-primary shadow-[0.4rem_0.4rem_] shadow-primary transition-shadow duration-300 hover:shadow-[0.6rem_0.6rem_] hover:shadow-primary">
                <CardHeader>
                  <CardTitle>{chapter.topics[currentPage].topicName}</CardTitle>
                </CardHeader>
                <CardContent className="bg-background h-[57vh] overflow-auto text-secondary-foreground">
                  {renderTopicContent(topicContent)}
                </CardContent>
              </Card>
              <div className="flex justify-between">
                <Pagination className="mx-[-10%] mt-2 text-secondary-foreground w-2/6 flex justify-center">
                  <PaginationContent className="flex space-x-2">
                    {chapter.topics.map((topic, index) => (
                      <PaginationItem
                        onClick={() => { paginate(index) }}
                        key={topic.topicName}
                      >
                        <PaginationLink
                          key={topic.topicName}
                          className={`p-4 rounded-full cursor-pointer ${currentPage === index ? 'bg-primary text-transparent' : 'bg-secondary text-transparent'} hover:bg-primary hover:text-white`}
                        >
                          {index + 1}
                        </PaginationLink>
                      </PaginationItem>
                    ))}
                  </PaginationContent>
                </Pagination>
                {currentPage === chapter.topics.length - 1 && <Button className="mt-2 mr-3" onClick={handleQuiz}>Take Quiz</Button>}
              </div>
            </TabsContent>
          ))
        )}
      </Tabs>
    </div>
  );
};

export default CourseContent;
