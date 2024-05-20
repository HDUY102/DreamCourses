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

const Chart = () => {
  const [chartData, setChartData] = useState<{ count: number }[]>([]);
  useEffect(()=>{
    const fetchTotalRevenue = async () => {
      const response = await fetch(`/api/admin/homeAdmin`,{
        method: "GET"
      })
      if(response.ok){
        const data = await response.json()
        const revenueChart = data["Biểu đồ doanh thu: "];

        const formattedData = Array.from({ length: 12 }, (_, i) => ({
          count: 0,
        }));

        revenueChart.forEach((item:any) => {
          formattedData[item.monthCreate - 1].count = item.count;
          console.log("item.monthCreate ",item.monthCreate-1)
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
          <YAxis />
          <Tooltip contentStyle={{ background: "#151c2c", border: "none" , content: "none"}} />
          <Legend />
          <Line
            type="monotone"
            dataKey="count"
            name="Doanh thu"
            stroke="#ff00ff"
            // strokeDasharray="5 5"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Chart;