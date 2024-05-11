import React, { useEffect, useState, useRef } from "react";
import { useChapterStore } from "@/app/lib/hooks/useChapterStore";
import { useLessonsStore } from "@/app/lib/hooks/useLessonsStore";
import { useCoursesStore } from "@/app/lib/hooks/useCoursesStore";
import { useParams } from "next/navigation";
import Link from "next/link";
import { IoMdCheckmark } from "react-icons/io";

const SidebarChapter = ({ completedLessons }:any) => {
  const { id } = useParams();
  const idCourse = Array.isArray(id) ? parseInt(id[0]) : parseInt(id as string);

  const { isLoadingChapters, chapters, fetchDataChapters } = useChapterStore();
  const { isLoadingLessons, lessons, fetchDataLessons } = useLessonsStore();
  const { isLoadingCourses, courses, fetchDataCourses } = useCoursesStore();
  const courseChapters = chapters.filter(
    (chapter) => chapter.courseId === idCourse
  );

  const course = useCoursesStore.getState().getCourseById(idCourse)[0];
  const [showLessons, setShowLessons] = useState({});

  useEffect(() => {
    fetchDataChapters(idCourse);
    fetchDataCourses(idCourse);
  }, [idCourse, fetchDataChapters, fetchDataCourses]);

  useEffect(() => {
    chapters.forEach((chapter) => {
      fetchDataLessons(chapter.idChapter);
    });
  }, [chapters, fetchDataLessons]);

  const toggleShowLessons = (chapterId) => {
    setShowLessons((prevState) => ({
      ...prevState,
      [chapterId]: !prevState[chapterId],
    }));
  };

  return (
    <div className="h-full overflow-y-auto" style={{ height: "100%" }}>
      <ul className="space-y-2">
        {courseChapters.map((chapter, index) => (
          <li key={index} className="border-b py-2 px-4">
            <button
              onClick={() => toggleShowLessons(chapter.idChapter)}
              className="flex justify-between items-center w-full hover:bg-gray-100"
            >
              <span className="font-bold text-base py-2">
                {index + 1}. {chapter.titleChapter}
              </span>
              <span>
                {showLessons[chapter.idChapter] ? (
                  <span className="font-bold">&#65087;</span>
                ) : (
                  <span>&#65088;</span>
                )}
              </span>
            </button>
            {showLessons[chapter.idChapter] && (
              <ul>
                {lessons
                  .filter((lesson) => lesson.chapterId === chapter.idChapter)
                  .map((lesson, lessonIndex) => (
                    <li
                      key={lessonIndex}
                      className="hover:cursor-pointer hover:bg-gray-100 py-2 px-3 flex items-center"
                    >
                      <Link
                        href={`/courses/learning/${idCourse}/${lesson.idLessons}`}
                        legacyBehavior
                      >
                        <a className="flex items-center w-full">
                          <span className="flex items-center w-full">
                            <span className="flex items-center w-full justify-between">
                              <span>{lesson.titleLessons}</span>
                              {completedLessons.includes(lesson.idLessons) && (
                                <IoMdCheckmark className="text-green-600" size={22} />
                              )}
                            </span>
                          </span>
                        </a>
                      </Link>
                    </li>
                  ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SidebarChapter;