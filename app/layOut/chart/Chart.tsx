"use client";
import React from "react";
import styles from "@/app/layOut/chart/Chart.module.css";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
const data = [
  {
    name: "Jan",
    student: 4000,
    income: 2400,
  },
  {
    name: "Feb",
    student: 3000,
    income: 1398,
  },
  {
    name: "Mar",
    student: 2000,
    income: 3800,
  },
  {
    name: "Apr",
    student: 2780,
    income: 3908,
  },
  {
    name: "May",
    student: 4800,
    income: 1890,
  },
  {
    name: "Jun",
    student: 2390,
    income: 3800,
  },
  {
    name: "Jul",
    student: 3490,
    income: 4300,
  },
  {
    name: "Aug",
    student: 2000,
    income: 1900,
  },
  {
    name: "Sep",
    student: 4000,
    income: 2500,
  },
  {
    name: "Oct",
    student: 4500,
    income: 4000,
  },
  {
    name: "Nov",
    student: 5500,
    income: 4500,
  },
  {
    name: "Dec",
    student: 6000,
    income: 5700,
  },
];

const Chart = () => {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Tổng doanh thu</h2>
      <ResponsiveContainer width="100%" height="90%">
        <LineChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip contentStyle={{ background: "#151c2c", border: "none" }} />
          <Legend />
          <Line
            type="monotone"
            dataKey="student"
            stroke="#8884d8"
            strokeDasharray="5 5"
          />
          <Line
            type="monotone"
            dataKey="income"
            stroke="#82ca9d"
            strokeDasharray="3 4 5 2"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Chart;