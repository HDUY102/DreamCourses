// "use client";
import React, { useEffect } from "react";
import styles from "@/app/teacher/Teacher.module.css";
import Sidebar from "@/app/teacher/sidebar/TeacherSidebar";
import { FaPlusCircle, FaFile } from "react-icons/fa";
import Link from "next/link";
import { DataTable } from "./datatable";
import { columns } from "./columns";
import { useCourseStore } from "@/app/lib/hooks/useCourseStore";
import prisma from "@/prisma/client";

const CourseManage = async () => {
  // const data = await getData()
  const courses = await prisma.courses.findMany({
    // where:{
    //   idCourse,
    // },
    orderBy:{
      titleCourse: "desc"
    }
  })
  // const { fetchDataCourses, isLoadingCourses } = useCourseStore();
  // const { onDelete } = useCourseStore();
  // useEffect(() => {
  //   fetchDataCourses();
  // }, []);
  
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
          <DataTable columns={columns} data={courses}/>
          {/* {isLoadingCourses ? (
              <div className="text-center text-lg">Loading...</div>
            ) : (
              <DataTable columns={columns} data={courses}/>
          )} */}
        </div>
      </div>
    </div>
  );
};

export default CourseManage;
