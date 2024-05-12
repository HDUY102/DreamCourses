"use client";
import React, { useEffect, useState } from "react";
import { useLessonsStore } from "@/app/lib/hooks/useLessonsStore";
import { useCoursesStore } from "@/app/lib/hooks/useCoursesStore";
import { useChapterStore } from "@/app/lib/hooks/useChapterStore";
import { useParams } from "next/navigation";
import SidebarChapter from "../_components/SidebarChapter";
import Header from "../_components/Header";
import { usePathname } from "next/navigation";
import VideoPlayer from "@/app/courses/learning/_components/video-player"

const Page = () => {
  const { id } = useParams();
  const pathname = usePathname();
  const lessonId = pathname.split("/").pop();
  const idCourse = Array.isArray(id) ? parseInt(id[0]) : parseInt(id as string);

  const { isLoadingCourses, courses, fetchDataCourses } = useCoursesStore();
  const { isLoadingChapters, chapters, fetchDataChapters } = useChapterStore();
  const { isLoadingLessons, lessons, fetchDataLessons } = useLessonsStore();

  const [selectedLesson, setSelectedLesson] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  const [completedLessons, setCompletedLessons] = useState<number[]>([]);

  const [idUser, setIdUser] = useState("");

  useEffect(() => {
    if (idCourse) {
      fetchDataLessons(idCourse);
    }

    // lấy idUser từ localStorage
    const currentUser = localStorage.getItem("idUser");
    if (currentUser) {
      console.log("User found in localStorage:", currentUser);
      setIdUser(currentUser);
    } else {
      console.log("No current user in localStorage");
    }
  }, [fetchDataLessons, idCourse]);

  useEffect(() => {
    // lưu các bài học đã hoàn thành nếu có cả idUser và idCourse
    if (idUser && idCourse) {
      try {
        const localStorageKey = `completedLessons_${idUser}_course_${idCourse}`;
        const savedCompletedLessons = JSON.parse(
          localStorage.getItem(localStorageKey) || "[]"
        );
        setCompletedLessons(savedCompletedLessons);
        // console.log("Completed lessons:", savedCompletedLessons);
        const lastCompletedLessonId =
          savedCompletedLessons[savedCompletedLessons.length - 1];
        const lastCompletedLesson = lessons.find(
          (lesson) => lesson.idLessons === lastCompletedLessonId
        );
        setSelectedLesson(lastCompletedLesson);
        setLoading(false);
      } catch (error) {
        console.error("Error parsing completed lessons:", error);
      }
    }
  }, [idUser, idCourse, lessons]);

  useEffect(() => {
    const selectedLesson = lessons.find(
      (lesson: any) => lesson.idLessons.toString() === lessonId
    );
    setSelectedLesson(selectedLesson || null);
    setLoading(false);
  }, [lessons, lessonId]);

  const handleCompleteAndContinue = (e:any) => {
    e.preventDefault();

    if (selectedLesson && idUser && idCourse) {
      const completedLessonId = selectedLesson.idLessons;
      if (!completedLessons.includes(completedLessonId)) {
        setCompletedLessons([...completedLessons, completedLessonId]);
        const localStorageKey = `completedLessons_${idUser}_course_${idCourse}`;
        localStorage.setItem(
          localStorageKey,
          JSON.stringify([...completedLessons, completedLessonId])
        );
      } else {
        // Xóa bài học đã hoàn thành nếu nó đã hoàn thành
        setCompletedLessons(
          completedLessons.filter((id) => id !== completedLessonId)
        );
        const localStorageKey = `completedLessons_${idUser}_course_${idCourse}`;
        localStorage.setItem(
          localStorageKey,
          JSON.stringify(
            completedLessons.filter((id) => id !== completedLessonId)
          )
        );
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
            (lesson) => lesson.chapterId === nextChapter.idChapter
          );
        }
      }

      if (nextLesson) {
        setSelectedLesson(nextLesson);
        const nextLessonUrl = `/courses/learning/${idCourse}/${nextLesson.idLessons}`;
        window.history.pushState({}, "", nextLessonUrl);
      }
    }
  };

  const chaptersForCourse = chapters.filter(
    (chapter) => chapter.courseId === idCourse
  );

  const totalLessons = chaptersForCourse.reduce((total, chapter) => {
    return (
      total +
      lessons.filter((lesson) => lesson.chapterId === chapter.idChapter).length
    );
  }, 0);

  const completedPercentage = Math.min(
    Math.round((completedLessons.length / totalLessons) * 100),
    100
  );

  const handleQuiz = () => {
    const newUrl = `/courses/learning/quiz/${lessonId}`;
    window.location.href = newUrl;
  };

  return (
    <div className="flex flex-col h-screen">
      <Header completedPercentage={completedPercentage} />
      <div className="flex flex-1 mt-24">
        <div className="w-1/4 p-4 border-r">
          <SidebarChapter
            selectedLesson={selectedLesson}
            completedLessons={completedLessons}
          />
        </div>
        <div className="flex-1 p-4 overflow-y-auto">
          <div className="container mx-auto px-4">
            <div className="w-full h-auto mb-8 rounded-md" controls>
              {loading ? (
                <div>Loading...</div>
              ) : selectedLesson && selectedLesson.videoUrl !== null ? (
                <VideoPlayer
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
                <button
                  onClick={handleQuiz}
                  className="bg-slate-950 text-white hover:bg-slate-950/70 font-bold py-3 px-4 rounded-lg "
                >
                  Làm bài Quiz
                </button>

                <button
                  id="completeButton"
                  type="button"
                  className="bg-emerald-600 text-white hover:bg-emerald-600/80 font-bold py-3 px-4 rounded-lg flex items-center focus:outline-none focus:shadow-outline"
                  onClick={handleCompleteAndContinue}
                >
                  {completedLessons.includes(selectedLesson?.idLessons)
                    ? "Hủy hoàn thành"
                    : "Hoàn thành và tiếp tục"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;