"use client";
import React, { useEffect, useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import Footer from "@/app/components/Footer";
import HeaderNav from "@/app/components/HeaderNav";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useCoursesStore } from "@/app/lib/hooks/useCoursesStore";
import { useChapterStore } from "@/app/lib/hooks/useChapterStore";
import { useLessonsStore } from "@/app/lib/hooks/useLessonsStore";
import Image from "next/image";
import { ToastContainer,toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Page = () => {
  const router = useRouter()
  const notify: any = () =>
    toast.success("Đăng ký khóa học thành công!", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
  });
  const token = sessionStorage.getItem("token");
  if (!token){
    router.push("/login")
  };

  const { id } = useParams();
  const idCourse = parseInt(id as string)
  // const course = courses.find(course => course.idCourse === idCourse);
  const course = useCoursesStore.getState().getCourseById(idCourse)[0];
  const teacherName = course
    ? useCoursesStore.getState().getTeacherUsername(course.teacherId)
    : "";
  const { isLoadingCourses,courses, fetchDataCourses } = useCoursesStore();
  const { isLoadingLessons, lessons, fetchDataLessons,getLessonsByChapterId } = useLessonsStore();
  const { chapters, fetchDataChapters } = useChapterStore();

  const [completedLessons, setCompletedLessons] = useState<number[]>([]);
  const [selectedLesson, setSelectedLesson] = useState<any | null>(null);

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");


  const [numLessons, setNumLessons] = useState(0);

  useEffect(() => {
    if (token) {
      setIsLoggedIn(true);
      const decodedToken = JSON.parse(atob(token.split(".")[1]));
      setUserName(decodedToken.Username);
    }
  }, []);

  useEffect(() => {
    fetchDataCourses();
    fetchDataChapters();
    fetchDataLessons();
  }, []);

  useEffect(() => {
    if (completedLessons.length > 0 && !selectedLesson) {
      const firstLesson = lessons.find(
        (lesson) => lesson.idLessons === completedLessons[0]
      );
      if (firstLesson) {
        setSelectedLesson(firstLesson);
      }
    }
  }, [completedLessons, lessons, selectedLesson]);

    const handleRegisterCourse = () => {
      if (!isLoggedIn) {
        alert("Bạn cần phải đăng nhập!");
      } else {
        const selectedCourse = courses.find(
          (course) => course.idCourse === idCourse
        );
        if (selectedCourse && selectedCourse.price > 0) {
          window.location.href = `/payment/${idCourse}`;
        } else {
          if (token) {
            const decodedToken = JSON.parse(atob(token.split(".")[1]));
            const userId = decodedToken.idUser;
            const userCourses = JSON.parse(localStorage.getItem(userId) || "[]");
            const fetchMyCourse = async () => {
              const response = await fetch(`/api/students/courses/${idCourse}`,{
                method:'POST',
                headers: {
                  Authorization: `Bearer ${token}`,
                  "Content-Type": "application/json",
                }
              })
              if(response.ok){
                notify()
              }else{
                console.log("Đăng ký thất bại")
              }
            }
            fetchMyCourse()
            if (!userCourses.includes(idCourse)) {
              userCourses.push(idCourse);
              localStorage.setItem(userId, JSON.stringify(userCourses));
            }
          } else {
            console.error("No user token found");
          }

          // Tìm chương đầu tiên và bài học của khóa học
          const chaptersForCourse = chapters.filter(
            (chapter) => chapter.courseId === idCourse
          );
          const firstChapter = chaptersForCourse[0];
          const lessonsForChapter = lessons.filter(
            (lesson) => lesson.chapterId === firstChapter.idChapter
          );
          const firstLessonId = lessonsForChapter[0].idLessons;

          // Thêm bài học đầu tiên vào mảng CompleteLessons
          setCompletedLessons((prevCompletedLessons) => [
            ...prevCompletedLessons,
            firstLessonId,
          ]);

          const newUrl = `/courses/learning/${idCourse}/${firstLessonId}`;
          window.location.href = newUrl;
        }
      }
    };

  useEffect(() => {
    // Lọc các chương theo ID khóa học
    const chaptersForCourse = chapters.filter(
      (chapter) => chapter.courseId === idCourse
    );  

    // Tính số bài học trong các chương của khóa học
    const totalLessons = chaptersForCourse.reduce((total, chapter) => {
      return (
        total +
        lessons.filter((lesson) => lesson.chapterId === chapter.idChapter)
          .length
      );
    }, 0);

    setNumLessons(totalLessons);
  }, [chapters, lessons, idCourse]);
  const [showLessons, setShowLessons] = useState<{ [key: number]: boolean }>({});

  // show danh sách lesson
  const toggleShowLessons = async (chapterId: number) => {
    const chapterLessons = await useLessonsStore.getState().getLessonsByChapterId(chapterId);
    setShowLessons((prevShowLessons) => ({
        ...prevShowLessons,
        [chapterId]: !prevShowLessons[chapterId],
        lessons: chapterLessons,
    }));
  };

  const buttonText = () => {
    const selectedCourse = courses.find(
      (course) => course.idCourse === idCourse
    );

    if (token) {
      const decodedToken = JSON.parse(atob(token.split(".")[1]));
      const userId = decodedToken.idUser;
      const userCourses = JSON.parse(localStorage.getItem(userId) || "[]");
      if (userCourses.includes(idCourse)) {
        return "Tiếp tục học";
      }
    }

    return selectedCourse && selectedCourse.price>0
      ? "Mua khoá học"
      : "Đăng kí học";
  };

  return (
    <div>
      <div className="sticky top-0 z-10">
        <HeaderNav />
      </div>
      <div className="h-full pt-20 mx-2 border-b ml-3">
        <Link
          href="/"
          className="flex items-center text-sm font-medium py-3 px-4 rounded-lg focus:outline-none focus:shadow-outline"
        >
          <IoIosArrowBack className="mr-2" size={18} />
          Quay lại
        </Link>
      </div>
      <div className="md:col-span-1 md:mt-0">
          <div className="float-right mx-2 mt-4">
            <button
              onClick={handleRegisterCourse}
              className="bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium py-3 px-4 rounded-lg focus:outline-none focus:shadow-outline mr-10"
            >
              {buttonText()}
            </button>
            <ToastContainer />
          </div>
      </div>
      <div className=" ml-3 mb-48">
        <div className="grid grid-cols-2 md:col-span-1 mt-4">
          <div>
              <h2 className="text-2xl font-bold mb-4">{course?.titleCourse}</h2>
              <div className="h-auto">
                {course?.image ? (
                        <Image
                            width={200}
                            height={0}
                            src={course.image}
                            alt="Hình"
                            className="w-full object-cover"
                        />
                        ) : null}
              </div>
              <p className="text-gray-600 mb-4 mt-2">Mô tả: <br></br>{course?.introduce}</p>
              <p className="text-gray-600 mb-4">
                Được tạo bởi :{" "}
                <span className="text-gray-600 mb-4 font-bold">
                  {teacherName || "Unknown"}
                </span>
              </p>
          </div>
          <div className="mx-2 my-2">
            <div className="flex flex-col gap-2">
              <div>
                <span className="text-xl font-bold mb-4">
                  Nội dung khoá học
                </span>
              </div>
              <div>
                <span className="text-base font-normal mb-4 mr-2">
                  <span className="font-bold">
                    {
                      chapters.filter(
                        (chapter) => chapter.courseId === idCourse && chapter.isPublished
                      ).length
                    }{" "}
                  </span>
                  chương
                </span>
                <span className="text-base font-normal mb-4">
                  <span className="font-bold"> {numLessons} </span>
                  bài
                </span>
              </div>
            </div>

            <ul>
              {chapters.filter((chapter) => chapter.courseId === idCourse && chapter.isPublished).map((chapter) => (
                  <li key={chapter.idChapter}>
                    <button
                        onClick={() => toggleShowLessons(chapter.idChapter)}
                      className="flex justify-between items-center w-full hover:bg-gray-100"
                    >
                      <span className="font-bold text-base py-2">
                        {chapter.titleChapter}
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
                          .filter(
                            (lesson) => lesson.chapterId === chapter.idChapter && lesson.isPublished
                          )
                          .map((lesson, lessonIndex) => (
                            <li
                              key={lessonIndex}
                              className="hover:cursor-pointer py-2 px-3 flex items-center"
                            >
                              <span className="flex items-center w-full">
                                <span>{lesson.titleLessons}</span>
                              </span>
                            </li>
                          ))}
                      </ul>
                    )}
                  </li>
                ))}
            </ul>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Page;
