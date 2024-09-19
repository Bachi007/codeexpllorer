'use client';
import CourseContent from "@/components/dashboard-components/courses-components/chapter-island/course-content/course-content";
import { useSearchParams } from "next/navigation";

const ChapterPage = () => {
    const params = useSearchParams();
    const chapterInd = params.get('chapterIndex');
    const courseId = params.get('courseId');
    
    return <CourseContent chapterId={chapterInd || ""} courseId={courseId ||""} />;
};


export default ChapterPage;
