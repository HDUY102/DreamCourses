"use client";
import { useEffect, useRef,useState } from "react";
import { Chart } from "chart.js/auto";
import { useRouter } from 'next/navigation';

export default function ChartStudent() {
  const chartRef = useRef(null);
  const [chartData, setChartData] = useState([])
  const router = useRouter()
  const token = sessionStorage.getItem("token")
  if (!token) {
    router.push('/login')
  }
  useEffect(() => {
    const fetchData = async () => {
      const respone = await fetch("http://localhost:3000/api/adminRevenue")
      if(!respone.ok){
        console.error("Error")
      }
      const data = await respone.json()
      setChartData(data)
    } 
    fetchData()
  }, [])

  useEffect(() => {
    if (chartRef.current) {
      if (chartRef.current.chart) {
        chartRef.current.chart.destroy();
      }

      const context = chartRef.current.getContext("2d");

      const dataToShow = [0,0,0,0,0,0,0,0,0,0,0,0]

      chartData.map(item => dataToShow[item.monthCreated-1] = item.count);

      const newChart = new Chart(context, {
        type: "line",
        data: {
          labels: [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
          ],
          datasets: [
            {
              label: "Doanh thu",
              data: dataToShow,
              borderWidth: 1,
            },
          ],
        },
        options: {
          plugins: {
            title:{
              display: true,
              text: "Doanh thu"
            }
          },
          scales: {
            x: {
              type: "category",
            },
            y: {
              beginAtZero: true,
            },
          },
        },
      });
      chartRef.current.chart = newChart;
    }
  }, [chartData]);
  return (
    <div>
      <div style={{marginRight: "0px", maxWidth: "90vw", height: "80vh", alignContent: "end" }}>
        <canvas ref={chartRef} />
      </div>
    </div>
  );
}
