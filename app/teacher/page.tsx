import React from "react";
import styles from "@/app/teacher/Teacher.module.css";
import Sidebar from "./sidebar/TeacherSidebar";
import CoursePage from "@/app/teacher/course/page"
import Search from "@/app/layOut/search/Search";
import LayoutCard from "@/app/layOut/layoutCard/LayoutCard";
import Chart from "@/app/layOut/chart/Chart";

const HomeTeacher = () => {
  return (
    <div className={styles.container}>
      <div className={styles.menu}>
        <Sidebar />
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
