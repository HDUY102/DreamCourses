"use client";
import React, { useEffect, useState } from "react";
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

const ChartTeacher = () => {
  const [chartData, setChartData] = useState<{ count: number }[]>([]);
  const token = sessionStorage.getItem("token");
  useEffect(()=>{
    const fetchTotalRevenue = async () => {
      const response = await fetch(`/api/teacher/homeTeacher`,{
        method: "GET",
        headers:{
          Authorization: `Bearer ${token}`,
        }
      })
      if(response.ok){
        const data = await response.json()
        const revenueChart = data["Biểu đồ doanh thu: "];

        const formattedData = Array.from({ length: 12 }, (_, i) => ({
          month: i + 1,
          count: 0,
          revenue: 0
        }));

        revenueChart.forEach((item:any) => {
          formattedData[item.month - 1].count = item.count;
          formattedData[item.month - 1].revenue = item.revenue;
        });
        setChartData(formattedData);
      }
    }
    fetchTotalRevenue()
  },[])
  return (
    <div className={styles.container}>
      <h1 className="text-center text-2xl mb-10">Biểu Đồ Tổng Doanh Thu</h1>
      <ResponsiveContainer width="100%" height="90%">
        <LineChart
          width={500}
          height={300}
          data={chartData}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 10,
          }}
        >
          <XAxis dataKey="month" />
          <YAxis dataKey="revenue" />
          <Tooltip contentStyle={{ background: "#fff9c4", border: "none" }} />
          <Legend />
          <Line
            type="monotone"
            dataKey="count"
            name="Lượt đăng ký"
            stroke="black"
            strokeDasharray="5 10"
          />
          <Line
            type="monotone"
            dataKey="revenue"
            name="Doanh thu"
            stroke="black"
            // strokeDasharray="5 5"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ChartTeacher;