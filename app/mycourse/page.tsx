"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import HeaderNav from "@/app/components/HeaderNav";
import Footer from "@/app/components/Footer";
import { useCoursesStore } from "@/app/lib/hooks/useCoursesStore";
import { courses } from "@prisma/client";

const MyCoursePage = () => {
  const [myCourses, setMyCourses] = useState<courses[]>([]);
  const [courseDetails, setCourseDetails] = useState([]);
  const [teacherNames, setTeacherNames] = useState({});
  const { courses, fetchDataCourses } = useCoursesStore();
  const token = sessionStorage.getItem("token");

  const fetchMyCourses = async () => {
      const token = sessionStorage.getItem("token");
      if (!token) return;
      
      try {
          const response = await fetch("/api/students/mycourse", {
              method: "GET",
              headers: {
                  Authorization: `Bearer ${token}`,
                  "Content-Type": "application/json",
              },
          });

          if (response.ok) {
              const data = await response.json();
              setMyCourses(data.course);
          } else {
              console.error("Failed to fetch courses");
          }
      } catch (error) {
          console.error("Error fetching courses:", error);
      }
  };
  useEffect(() => {

    fetchMyCourses();
  }, []);

  useEffect(() => {
    if (token) {
      const decodedToken = JSON.parse(atob(token.split(".")[1]));
      const userId = decodedToken.idUser;
      const storedCourses = JSON.parse(localStorage.getItem(userId) || "[]");
      console.log("storedCourses",storedCourses)
      setMyCourses(storedCourses);
    }

    fetchDataCourses();
  }, [fetchDataCourses]);

    useEffect(() => {
      fetchMyCourses()
      if (myCourses && myCourses.length > 0 && courses.length > 0) {
        const filteredCourses = courses.filter((course) =>
          myCourses.includes(course.idCourse)
        );
        setCourseDetails(filteredCourses);
      }
    }, [courses, myCourses]);

  
  useEffect(() => {
    const fetchTeacherNames = async () => {
      const teacherNamesData = {};
      for (const course of courseDetails) {
        const teacherName = await useCoursesStore
          .getState()
          .getTeacherUsername(course.teacherId);
        teacherNamesData[course.idCourse] = teacherName;
      }
      setTeacherNames(teacherNamesData);
    };
  
    fetchTeacherNames();
  }, [courseDetails]);


  // console.log("courseDetails", courseDetails)
  // console.log("courseDetails.length", courseDetails.length )

  return (
    <>
      <div className="sticky top-0 z-10">
        <HeaderNav />
      </div>
      <div className="h-full pt-10 mx-2 border-b ml-3">
        <div className="container mx-auto px-6 py-10 max-h-full">
          <h1 className="text-2xl font-bold mb-6">Khoá học của tôi</h1>
          <div className="flex flex-row -mx-3 lg:flex-row lg:flex-wrap ">
            <>
              {courseDetails.length === 0 ? (
                <div className="text-center text-lg px-3 h-[468px]">
                  Bạn chưa có bất kì khoá học nào !
                </div>
              ) : (
                courseDetails.map((course, index) => (
                  <div
                    key={index}
                    className="flex-none w-full lg:w-1/3 md:w-1/2 px-3 mb-10"
                  >
                    <Link
                      href={`/courses/course/${course.idCourse}`}
                      legacyBehavior
                      className="flex flex-col h-full w-full"
                    >
                      <div className="flex flex-col bg-white shadow-md hover:shadow-lg rounded-lg overflow-hidden">
                        <Image
                          width={279}
                          height={157}
                          src={course.image}
                          alt="Hình"
                          className="w-full h-40 object-cover"
                        />
                        {/* ) : null} */}
                        <div className="p-4">
                          <h2 className="text-xl font-semibold mb-2">
                            {course.titleCourse}
                          </h2>
                          <p className="text-gray-700">
                            Bởi :{" "}
                            <span className="font-bold text-lg">
                              {teacherNames[course.idCourse]}
                            </span>
                          </p>
                        </div>
                      </div>
                    </Link>
                  </div>
                ))
              )}
            </>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default MyCoursePage;