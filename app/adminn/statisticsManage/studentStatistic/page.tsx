// import React from 'react'
import Sidebar from "@/app/adminn/sidebar/AdminSidebar";
import styles from "@/app/adminn/dashboard.module.css";
// import Chart from "@/app/layOut/chart/Chart";

// const studentStatistic = () => {
//   return (
//     <div className={styles.container}>
//       <div className={styles.menu}>
//         <Sidebar />
//       </div>
//       <div className={styles.contentmenu}>
//         <Chart />
//       </div>
//     </div>
//   )
// }

// export default studentStatistic

// "use client"
// import React, { useState, useEffect } from 'react';
// import { Line } from 'react-chartjs-2';
// const Dashboard = () => {
  
//   const [data, setData] = useState({
//     labels: [],
//     datasets: [
//       {
//         label: 'Real-time Data',
//         data: [],
//         borderColor: 'rgba(75, 192, 192, 1)',
//         backgroundColor: 'rgba(75, 192, 192, 0.2)',
//       },
//     ],
//   });
//   // Simulate real-time data updates
//   useEffect(() => {
//     const interval = setInterval(() => {
//       const newLabel = new Date().toLocaleTimeString();
//       const newData: number = Math.floor(Math.random() * 100);
//       // setData((prevData) => ({
//       //   labels: [...prevData.labels, newLabel],
//       //   datasets: [
//       //     {
//       //       ...prevData.datasets[0],
//       //       data: [...prevData.datasets[0].data, newData],
//       //     },
//       //   ],
//       // }));
//       setData(prevData => {
//         const newLabel = new Date().toLocaleTimeString();
//         const newData: number = Math.floor(Math.random() * 100);
        
//         const updatedData = {
//           labels: [...prevData.labels, newLabel],
//           datasets: [
//             {
//               ...prevData.datasets[0],
//               data: [...prevData.datasets[0].data, newData],
//             },
//           ],
//         };
        
//         return updatedData as React.SetStateAction<typeof data>;
//       });
//     }, 2000); // Update every 2 seconds
//     return () => clearInterval(interval);
//   }, []);
//   return (
//     <div className="dashboard">
//       <h1>Real-time Dashboard</h1>
//       <Line data={data} />
//     </div>
//   );
// };
// export default Dashboard;
import BarChartStudent from "@/app/adminn/statisticsManage/studentStatistic/BarChartStudent";

export default function studentStatistic(){
  return(
    <div className={styles.container}>
      <BarChartStudent/>
    </div>
  )
}