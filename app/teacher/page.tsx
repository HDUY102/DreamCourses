"use client"
import React from "react";
import styles from "@/app/teacher/Teacher.module.css";
import Search from "@/app/layOut/search/Search";
import LayoutCard from "@/app/layOut/layoutCard/LayoutCard";
import Chart from "@/app/layOut/chart/Chart";
import TeacherSidebar from "./sidebar/TeacherSidebar";
import{useRouter} from "next/navigation"
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
        <Search />
        <div className={styles.cards}>
          <LayoutCard />
        </div>
        <Chart />
      </div>
    </div>
  );
};

export default HomeTeacher;
