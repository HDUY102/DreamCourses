"use client";
import React, { useEffect, useState } from "react";
import styles from "@/app/teacher/Teacher.module.css";
import Sidebar from "@/app/teacher/sidebar/TeacherSidebar";
import { FaPlusCircle } from "react-icons/fa";
import Link from "next/link";
import { DataTable } from "./datatable";
import { columns } from "./columns";
import { useRouter } from "next/navigation";

const CourseManage = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [courses, setCourses] = useState([]);
  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (!token) {
      router.push("/login");
    } else {
      const fetchCourses = async () => {
        try {
          const response = await fetch("/api/courses", {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          if (!response.ok) {
            throw new Error("Failed to fetch courses");
          }
          const data = await response.json();
          setCourses(data.courses);
          setIsLoading(false);
        } catch (error) {
          console.error("Error fetching courses:", error);
          setIsLoading(false);
        }
      };

      fetchCourses();
    }
  }, []);

  return (
    <div className="flex ">
      <div className={styles.menu}>
        <Sidebar />
      </div>
      <div className={styles.contentmenu}>
        <div className="flex justify-between mt-8">
          <h1 className="mt-2 ml-4 font-bold text-2xl">KHÓA HỌC CỦA TÔI</h1>
          <Link href={"/teacher/course/createCourse"}>
            <button className="flex items-center bg-sky-800 text-white rounded-lg p-2 mr-3 hover:text-white hover:bg-red-500 ">
              <FaPlusCircle />
              Thêm mới khóa học
            </button>
          </Link>
        </div>
        <div>
          {isLoading ? (
            <div className="text-center text-lg">Loading...</div>
          ) : (
            <DataTable columns={columns} data={courses} />
          )}
        </div>
      </div>
    </div>
  );
};

export default CourseManage;
