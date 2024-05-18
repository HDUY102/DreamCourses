import React, { useEffect, useState } from "react";
import styles from "@/app/layOut/layoutCard/LayoutCard.module.css";


const LayoutCardTeacher = () => {
  const [totalStudents, setTotalStudents] = useState()
  const [totalCourses, setTotalCourses] = useState()
  const [totalRevenue, setTotalRevenue] = useState()
  const token = sessionStorage.getItem("token");
  
  useEffect(()=>{
    const fetchTotalStudents = async () => {
      const response = await fetch(`/api/teacher/homeTeacher`,{
        method: "GET",
        headers:{Authorization: `Bearer ${token}`,}
      })
      if(response.ok){
        const data = await response.json()
        setTotalStudents(data["Tổng học viên: "])
        setTotalCourses(data["Tổng số khóa học: "])
        setTotalRevenue(data["Tổng doanh thu: "])
      }
    }
    fetchTotalStudents()
  })
  const cards = [
    {
      id: 1,
      title: "Tổng số học viên",
      number: totalStudents + " học viên",
    },
    {
      id: 2,
      title: "Tổng số khóa học",
      number: totalCourses+ " khóa học",
      // change: 18,
    },
    {
      id: 3,
      title: "Tổng doanh thu",
      number: totalRevenue+ " vnđ",
    },
  ];
  return (
    <div className={styles.container}>
      {cards.map((cat) => (
        <div className={styles.list} key={cat.id}>
          <span className={styles.cat}>{cat.title}</span>
          <div className={styles.number}>{cat.number}</div>
        </div>
      ))}
    </div>
  );
};

export default LayoutCardTeacher;