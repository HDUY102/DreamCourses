import React, { useEffect, useState } from "react";
import styles from "@/app/layOut/layoutCard/LayoutCard.module.css";


const LayoutCard = () => {
  const [totalStudents, setTotalStudents] = useState()
  const [totalTeachers, setTotalTeachers] = useState()
  const [totalCourses, setTotalCourses] = useState()
  const [totalRevenue, setTotalRevenue] = useState()
  useEffect(()=>{
    const fetchTotalStudents = async () => {
      const response = await fetch(`/api/admin/homeAdmin`,{
        method: "GET"
      })
      if(response.ok){
        const data = await response.json()
        setTotalStudents(data["Tổng học viên: "])
        setTotalTeachers(data["Tổng số giảng viên: "])
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
      title: "Tổng số giảng viên",
      number: totalTeachers + " giảng viên",
    },
    {
      id: 3,
      title: "Tổng số khóa học",
      number: totalCourses+ " khóa học",
      // change: 18,
    },
    {
      id: 4,
      title: "Tổng doanh thu",
      number: totalRevenue+ " vnđ",
      // change: 18,
    },
  ];
  return (
    <div className={styles.container}>
      {cards.map((cat) => (
        <div className={styles.list} key={cat.id}>
          <span className={styles.cat}>{cat.title}</span>
          <div className={styles.number}>{cat.number}</div>
          {/* <div className={styles.detail}>
            <span
              className={cat.change > 0 ? styles.positive : styles.negative}
            >
              {cat.change}%
            </span>{" "}
            {cat.change > 0 ? "more" : "less"} than previous week
          </div> */}
        </div>
      ))}
    </div>
  );
};

export default LayoutCard;