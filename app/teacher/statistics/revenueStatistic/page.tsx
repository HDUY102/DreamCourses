"use client"
import React from 'react'
import Sidebar from "@/app/teacher/sidebar/TeacherSidebar";
import styles from "@/app/teacher/Teacher.module.css";
import LineChartRevenue from './LineChartRevenue';
import { useRouter } from 'next/navigation';
const revenueStatistic = () => {
  const router = useRouter()
  const token = sessionStorage.getItem("token")
  if (!token) {
    router.push('/login')
  }
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