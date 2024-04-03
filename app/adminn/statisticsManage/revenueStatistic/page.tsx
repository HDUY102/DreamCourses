import React from 'react'
import Sidebar from "@/app/adminn/sidebar/AdminSidebar";
import styles from "@/app/adminn/dashboard.module.css";
import LineChartRevenue from './LineChartRevenue';

const revenueStatistic = () => {
  return (
    <div className={styles.container}>
      <div className={styles.menu}>
        <Sidebar />
      </div>
      <div className={styles.contentmenu}>
        <LineChartRevenue/>
      </div>
    </div>
  )
}

export default revenueStatistic