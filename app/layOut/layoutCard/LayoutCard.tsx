import React from "react";
import { MdSupervisedUserCircle } from "react-icons/md";
import styles from "@/app/layOut/layoutCard/LayoutCard.module.css";

const cards = [
  {
    id: 1,
    title: "Total Student",
    number: 10.928,
    change: 12,
  },
  {
    id: 2,
    title: "Total Teacher",
    number: 8.236,
    change: -2,
  },
  {
    id: 3,
    title: "Totel Courses",
    number: 6.642,
    change: 18,
  },
];
const LayoutCard = () => {
  // const [totalStudents, setTotal]
  return (
    <div className={styles.container}>
      {cards.map((cat) => (
        <div className={styles.list} key={cat.id}>
          <span className={styles.cat}>{cat.title}</span>
          <div className={styles.number}>{cat.number}</div>
          <div className={styles.detail}>
            <span
              className={cat.change > 0 ? styles.positive : styles.negative}
            >
              {cat.change}%
            </span>{" "}
            {cat.change > 0 ? "more" : "less"} than previous week
          </div>
        </div>
      ))}
    </div>
  );
};

export default LayoutCard;