"use client";
import React, { useEffect, useState } from "react";
import { useChapterStore } from "@/app/lib/hooks/useChapterStore";
import { useParams, useRouter, usePathname } from "next/navigation";
import SidebarChapter from "../_components/SidebarChapter";
import Header from "../_components/Header";
import VideoPlayer from "@/app/courses/learning/_components/video-player";

const Page = () => {
  const { id } = useParams();
  const pathname = usePathname();
  const lessonId = pathname.split("/").pop();
  const idCourse = Array.isArray(id) ? parseInt(id[0]) : parseInt(id as string);
  const router = useRouter();

  const {  chapters } = useChapterStore();
  const [lessons, setLessons] = useState([])
  const [selectedLesson, setSelectedLesson] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [completedLessons, setCompletedLessons] = useState<number[]>([]);
  const [hasQuiz, setHasQuiz] = useState(true);
  const [courseCompleted, setCourseCompleted] = useState(false);

  const token = sessionStorage.getItem("token");
  if (!token) {
    router.push("/login");
  }

  useEffect(() => {
    const fetchLessons = async () => {
      const response = await fetch(`/api/students/lessons/${idCourse}`);
      if(response.ok){
        const data = await response.json();  
        setLessons(data.lessons);
      }    
    };
    const fetchQuizzes = async () => {
      const response = await fetch(`/api/students/lessons/quiz/${lessonId}`);
      const hasQuiz = await response.json();      
      setHasQuiz(hasQuiz);
    };
    const fetchCompletedLessons = async () => {
      try {
        const response = await fetch(`/api/students/lessons/completed_lesson/${idCourse}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        if (response.ok) {
          const data = await response.json();
          setCompletedLessons(data.map((lesson: any) => lesson.lessonId));
        }
      } catch (error) {
        console.error("Error fetching completed lessons:", error);
      } finally {
        setLoading(false);
      }
    };
    if (idCourse) {
      fetchLessons();
      fetchCompletedLessons();
    }
    // fetchLessons();
    fetchQuizzes();

  }, [idCourse, lessonId]);

  // useEffect(() => {
  //   const fetchQuizzes = async () => {
  //     const response = await fetch(`/api/students/lessons/quiz/${lessonId}`);
  //     const hasQuiz = await response.json();      
  //     setHasQuiz(hasQuiz);
  //   };
  //   fetchQuizzes();
  // }, []);

  // useEffect(() => {
  //   const fetchCompletedLessons = async () => {
  //     try {
  //       const response = await fetch(`/api/students/lessons/completed_lesson/${idCourse}`, {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //           "Content-Type": "application/json",
  //         },
  //       });
  //       const data = await response.json();
        
  //       setCompletedLessons(data.map((lesson: any) => lesson.lessonId));
  //     } catch (error) {
  //       console.error("Error fetching completed lessons:", error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
  
  //   if (idCourse) {
  //     fetchCompletedLessons();
  //   }
  // }, [idCourse]);

  useEffect(() => {
    const selectedLesson = lessons.find((lesson: any) => lesson.idLessons.toString() === lessonId);
    setSelectedLesson(selectedLesson || null);
    setLoading(false);
  }, [lessons, lessonId]);

  const courseCompletedToDB = async (idCourse:any) => {
    try {
      await fetch(`/api/students/courses/${idCourse}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          isFinished: true,
        }),
      });
    } catch (error) {
      console.error("Error saving quiz to the database:", error);
    }
  };
    
  const handleCompleteAndContinue = async (e: any) => {
    e.preventDefault();

    if (selectedLesson && idCourse) {
      const completedLessonId = selectedLesson.idLessons;
      setCompletedLessons([...completedLessons, completedLessonId]);

      try {
        await saveCompletedLessonToDB(completedLessonId, true);
      } catch (error) {
        console.error("Error saving completed lesson:", error);
      }

      let nextLesson = null;

      const currentChapter = chapters.find(
        (chapter: any) => chapter.idChapter === selectedLesson.chapterId
      );

      const nextLessonInCurrentChapter = lessons.find(
        (lesson: any) =>
          lesson.chapterId === selectedLesson.chapterId &&
          lesson.idLessons > selectedLesson.idLessons
      );

      if (nextLessonInCurrentChapter) {
        nextLesson = nextLessonInCurrentChapter;
      } else {
        const currentChapterIndex = chapters.findIndex(
          (chapter) => chapter.idChapter === selectedLesson.chapterId
        );

        if (currentChapterIndex < chapters.length - 1) {
          const nextChapter = chapters[currentChapterIndex + 1];
          nextLesson = lessons.find(
            (lesson:any) => lesson.chapterId === nextChapter.idChapter
          );
        }
      }

      if (nextLesson) {
        setSelectedLesson(nextLesson);
        const nextLessonUrl = `/courses/learning/${idCourse}/${nextLesson.idLessons}`;
        window.history.pushState({}, "", nextLessonUrl);
      } else {
          const completedCourseLessons =
            getCompletedLessonsForCourse(idCourse) + 1;
          // console.log("Completed course lessons:", completedCourseLessons);
          // console.log("Total lessons:", totalLessons);
          if (completedCourseLessons === totalLessons) {
            setCourseCompleted(true);
            courseCompletedToDB(idCourse);
          }
      }
    }
  };

  const saveCompletedLessonToDB = async (completedLessonId:any, isFinished:any) => {
    try {
      const response = await fetch(`/api/students/lessons/${completedLessonId}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          isFinished: isFinished,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to save completed lesson");
      }
    } catch (error) {
      console.error("Error saving completed lesson to the database:", error);
    }
  };

  const getCompletedLessonsForCourse = (courseId:any) => {
    return completedLessons.filter(lessonId => {
      const lesson = lessons.find(lesson => lesson.idLessons === lessonId);
      return lesson && lesson.chapterId && chapters.find(chapter => chapter.courseId === courseId && chapter.idChapter === lesson.chapterId);
    }).length;
  };

  const chaptersForCourse = chapters.filter(
    (chapter) => chapter.courseId === idCourse
  );

  const totalLessons = chaptersForCourse.reduce((total, chapter) => {
    return total + lessons.filter((lesson) => lesson.chapterId === chapter.idChapter && lesson.isPublished && chapter.isPublished).length;
  }, 0);

  const handleQuiz = () => {
    const newUrl = `/courses/learning/quiz/${lessonId}`;
    window.location.href = newUrl;
  };
  

  return (
    <div className="flex flex-col h-screen">
      <Header
        completedLessons={getCompletedLessonsForCourse(idCourse)}
        totalLessons={totalLessons}
      />
      <div className="flex flex-1 mt-24">
        <div className="w-1/3 p-4 border-r">
          <SidebarChapter
            selectedLesson={selectedLesson}
            completedLessons={completedLessons}
          />
        </div>
        <div className="flex-1 p-4 overflow-y-auto">
          <div className="container mx-auto px-4">
            <div className="w-full h-auto mb-8 rounded-md" >
              {loading ? (
                <div>Loading...</div>
              ) : selectedLesson && selectedLesson.videoUrl !== null ? (
                <VideoPlayer controls
                  key={selectedLesson.idLessons}
                  videoUrl={selectedLesson.videoUrl}
                />
              ) : (
                <div>Chưa có Video</div>
              )}
            </div>
            <div className="flex justify-between">
              <h1 className="text-2xl font-bold">
                {selectedLesson
                  ? selectedLesson.titleLessons
                  : "Lesson not found"}
              </h1>
              <div className="flex gap-2">
                {hasQuiz ? (
                  <button
                    onClick={handleQuiz}
                    className="bg-slate-800 text-white border hover:border-gray-950 shadow hover:bg-white hover:text-black font-bold py-3 px-4 rounded-lg "
                  >
                    Làm bài Quiz
                  </button>
                ) : null}
                <button
                  id="completeButton"
                  type="button"
                  className={`bg-emerald-600 text-white hover:bg-emerald-600/80 font-bold py-3 px-4 rounded-lg flex items-center focus:outline-none focus:shadow-outline ${
                  completedLessons.includes(selectedLesson?.idLessons) ? "cursor-not-allowed opacity-50": "" }`}
                  onClick={handleCompleteAndContinue}
                  disabled={completedLessons.includes(selectedLesson?.idLessons)}
                >
                  {completedLessons.includes(selectedLesson?.idLessons) ? "Bạn đã hoàn thành bài học này" : "Hoàn thành và tiếp tục"}
                </button>
              </div>
            </div>
            <div className="my-3 items-center">
            {courseCompleted && (
                  <div className="text-green-600 font-bold">
                    Bạn đã hoàn thành khóa học này
                  </div>
                )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
