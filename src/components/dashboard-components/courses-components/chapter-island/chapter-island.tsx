import React, { useState, useEffect } from 'react';
import { motion, useAnimation, useScroll } from 'framer-motion';
import { Book, Layers, LifeBuoy } from 'lucide-react';
import "./chapterisland.css";

interface Topic {
  topicName: string;
  topicType: string;
  topicContent: any[];
}

interface Chapter {
  chapterName: string;
  content: string;
  topics: Topic[];
}

interface Course {
  chapters: Chapter[];
}

interface ChapterIslandProps {
  course: Course;
}

const ChapterIsland: React.FC<ChapterIslandProps> = ({ course }) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const controls = useAnimation();
  const { scrollYProgress } = useScroll();

  useEffect(() => {
    controls.start({
      x: scrollYProgress.get() * -100,
      transition: { type: 'spring', stiffness: 100 },
    });
  }, [scrollYProgress, controls]);

  const animations = [
    { opacity: 1, y: 0, scale: 1.1 },
    { opacity: 1, y: 0, scale: 1.1 },
    { opacity: 1, y: 0, scale: 1.1 }
  ];

  const handleChapterClick = (index: number) => {
    // Handle chapter click event
  };

  return (
    <div className="relative cards flex flex-wrap gap-8 justify-center items-center overflow-hidden bg-background min-h-screen p-8">
      {/* Background SVG */}
      <svg className="absolute inset-0 w-full h-full object-cover opacity-30" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" style={{ stopColor: "#0099ff", stopOpacity: 0.4 }} />
            <stop offset="100%" style={{ stopColor: "#0066cc", stopOpacity: 0.6 }} />
          </linearGradient>
        </defs>
        <path fill="url(#gradient)" d="M0,64L48,96C96,128,192,192,288,224C384,256,480,256,576,213.3C672,171,768,85,864,64C960,43,1056,85,1152,106.7C1248,128,1344,128,1392,128L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
        {/* Additional SVG shapes or patterns */}
        <circle cx="720" cy="160" r="100" fill="#ffffff" opacity="0.1" />
        <circle cx="360" cy="240" r="80" fill="#ffffff" opacity="0.1" />
        {/* Add more elements as needed */}
      </svg>

      {/* Render chapters */}
      {course.chapters.map((chapter, index) => (
        <motion.div
          key={index}
          className={`card relative w-80 h-96 p-8 bg-primary rounded-2xl font-sans shadow-lg transition-transform duration-300 `}
          initial={{ opacity: 0, y: 50 }}
          animate={animations[index % animations.length]}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          whileHover={{ scale: 1.1 }}
          onClick={() => handleChapterClick(index)} // Handle click event
          onMouseEnter={() => setHoveredIndex(index)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          {/* Add the pseudo-elements */}
          <div className="pseudo-elements-container">
            <div className="pseudo-element-before" />
            <div className="pseudo-element-after" />
          </div>

          {/* Chapter content */}
          <div className="relative flex flex-col h-full justify-between">
            <div className="flex justify-between items-center">
              {/* Chapter name and icon */}
              <div className="mt-6 font-brenet-regular font-black text-2xl text-black">
                {chapter.chapterName}
              </div>
              {index === 0 && <Book className="w-8 h-8 text-black" />}
              {index === 1 && <Layers className="w-8 h-8 text-black" />}
              {index === 2 && <LifeBuoy className="w-8 h-8 text-black" />}
            </div>
            {/* Chapter content */}
            <div className="mt-2 font-normal font-brenet-shadow text-sm text-black">
              {chapter.content}
            </div>
            {/* Progress bar */}
            <div className="mt-6">
              <progress className="w-full h-2 rounded-full bg-black/30" value="70" max="100"></progress>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default ChapterIsland;
