"use client"
import React from "react";
import styles from "@/app/teacher/Teacher.module.css";
import Search from "@/app/layOut/search/Search";
import TeacherSidebar from "./sidebar/TeacherSidebar";
import{useRouter} from "next/navigation"
import LayoutCardTeacher from "../layOut/layoutCardTeacher/LayoutCardTeacher";
import ChartTeacher from "../layOut/chartTeacher/ChartTeacher";
const HomeTeacher = () => {
  const router = useRouter()
  const token = sessionStorage.getItem("token")
  if (!token) {
    router.push('/login')
    return
  }
  return (
    <div className={styles.container}>
      <div className={styles.menu}>
        <TeacherSidebar />
      </div>
      <div className={styles.content}>
        {/* <Search /> */}
        <div className={styles.cards}>
          <LayoutCardTeacher />
        </div>
        <ChartTeacher />
      </div>
    </div>
  );
};

export default HomeTeacher;
