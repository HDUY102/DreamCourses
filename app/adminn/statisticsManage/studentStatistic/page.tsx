"use client"
import Sidebar from "@/app/adminn/sidebar/AdminSidebar";
import styles from "@/app/adminn/dashboard.module.css";
import BarChartStudent from "@/app/adminn/statisticsManage/studentStatistic/BarChartStudent";
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