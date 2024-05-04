"use client";
import { useEffect, useRef,useState } from "react";
import { Chart } from "chart.js/auto";

export default function ChartStudent() {
  const chartRef = useRef(null);
  const [chartData, setChartData] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      const respone = await fetch("http://localhost:3000/api/adminStudent")
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

      chartData.map(item => dataToShow[item.monthCreate-1] = item.count);

      const newChart = new Chart(context, {
        type: "bar",
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
              label: "Students",
              data: dataToShow,
              backgroundColor: [
                "rgb(255,99,132, 0.2)",
                "rgb(255,159,64, 0.2)",
                "rgb(255,205,86, 0.2)",
                "rgb(75,192,192, 0.2)",
                "rgb(54,162,235, 0.2)",
                "rgb(153,102,255, 0.2)",
                "rgb(201,203,207, 0.2)",
              ],
              borderColor: [
                "rgb(255,99,132)",
                "rgb(255,159,64)",
                "rgb(255,205,86)",
                "rgb(75,192,192)",
                "rgb(54,162,235)",
                "rgb(153,102,255)",
                "rgb(201,203,207)",
              ],
              borderWidth: 1,
            },
          ],
        },
        options: {
          plugins: {
            title:{
              display: true,
              text: "Students"
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
