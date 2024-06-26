"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { FaShoppingCart } from "react-icons/fa";
import HeaderNav from "./components/HeaderNav";
import Footer from "./components/Footer";
import { useRouter } from "next/navigation";
import { PurchaseButton } from "./payment/PurchaseButton";

export default function Home() {
  const [coursesAll, setCoursesAll] = useState([])
  const [teacherNames, setTeacherNames] = useState({});
  const router = useRouter()
  const token = sessionStorage.getItem("token");
  useEffect(() => {
    const fetchAllCourses = async () => {
      try {
          const response = await fetch("/api/students/courses/homeCourses", {
              method: "GET",
              headers: {
                  Authorization:  token ? `Bearer ${token}`:'',
                  "Content-Type": "application/json",
              },
          });

          if (response.ok) {
              const data = await response.json();
              setCoursesAll(data.courses);
          } else {
              console.error("Failed to fetch courses");
          }
      } catch (error) {
          console.error("Error fetching courses:", error);
      }
    };
    fetchAllCourses()
  }, []);
  useEffect(() => {
    const fetchTeacherNames = async () => {
      const teacherNamesData = {};
      for (const course of coursesAll) {
        const teacherName = course.users.username;
        teacherNamesData[course.idCourse] = teacherName;
      }
      setTeacherNames(teacherNamesData);
    };
    fetchTeacherNames();
  }, [coursesAll]);

  const [cartItems, setCartItems] = useState([]);

  return (
    <>
      <div className="sticky top-0 z-10">
        <HeaderNav />
      </div>

      <div className="h-full pt-10 mx-2 border-b ml-3">
        <div className="container mx-auto px-6 py-10 max-h-full">
          <h1 className="text-2xl font-bold mb-6 mt-4">
            Các khoá học tại Dream Courses
          </h1>
          <div className="flex flex-row -mx-3 lg:flex-row lg:flex-wrap">
            {coursesAll.map((course, index) => (
              <div
                key={index}
                className="flex-none w-full lg:w-1/3 md:w-1/2 px-3 mb-10"
              >
                <Link
                  href={`/courses/course/${course.idCourse}`}
                  legacyBehavior
                  className="flex flex-col h-full w-full"
                >
                  <div className="flex flex-col bg-white shadow-md hover:shadow-lg rounded-xl overflow-hidden hover:cursor-pointer hover:bg-white hover:shadow-black/75 transition-all">
                    {course.image ? (
                      <Image
                        width={279}
                        height={157}
                        src={course.image}
                        alt="Hình"
                        className="w-full h-40 object-cover"
                      />
                    ) : null}
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
                <div className="p-4">
                  <div className="flex justify-between">
                    <span className="text-gray-700 font-bold mt-2">
                      {course.price == 0 ? "Miễn phí" : `${course.price}₫`}
                    </span>
                    {course.price !== 0 && (
                      <button
                        className="text-black font-bold px-4 rounded"
                      >
                        <PurchaseButton courseId={course.idCourse}/>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
