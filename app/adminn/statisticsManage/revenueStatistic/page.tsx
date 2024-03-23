import React from 'react'
import Sidebar from "@/app/adminn/sidebar/AdminSidebar";
import styles from "@/app/adminn/dashboard.module.css";
import Chart from "@/app/layOut/chart/Chart";

const revenueStatistic = () => {
  return (
    <div className={styles.container}>
      <div className={styles.menu}>
        <Sidebar />
      </div>
      <div className={styles.contentmenu}>
        <Chart />

      </div>
    </div>
  )
}

export default revenueStatistic