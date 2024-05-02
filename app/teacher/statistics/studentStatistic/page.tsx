import Sidebar from "@/app/adminn/sidebar/AdminSidebar";
import styles from "@/app/adminn/dashboard.module.css";
import BarChartStudent from "@/app/adminn/statisticsManage/studentStatistic/BarChartStudent";

export default function studentStatistic(){
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