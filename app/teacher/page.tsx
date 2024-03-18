import React from "react";
import Sidebar from "@/app/teacher/sidebar/AdminSidebar";
import styles from "@/app/teacher/dashboard.module.css";
import Search from "@/app/layOut/search/Search";
import LayoutCard from "@/app/layOut/layoutCard/LayoutCard";
import Chart from "@/app/layOut/chart/Chart";
const page = () => {
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

export default page;
