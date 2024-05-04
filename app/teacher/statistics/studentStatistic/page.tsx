"use client"
import Sidebar from "@/app/teacher/sidebar/TeacherSidebar";
import styles from "@/app/teacher/Teacher.module.css";
import BarChartStudent from "./BarChartStudent";
import { useRouter } from 'next/navigation';

export default function studentStatistic(){
  const router = useRouter()
  const token = sessionStorage.getItem("token")
  if (!token) {
    router.push('/login')
  }
  return(
    <div className={styles.container}>
      <div className={styles.menu}>
        <Sidebar />
      </div>
      <div className={styles.contentmenu}>
        <BarChartStudent/>
      </div>
    </div>
  )
}