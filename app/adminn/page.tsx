'use client'
import React from "react";
import Sidebar from "@/app/adminn/sidebar/AdminSidebar";
import styles from "@/app/adminn/dashboard.module.css";
import Search from "@/app/layOut/search/Search";
import LayoutCard from "@/app/layOut/layoutCard/LayoutCard";
import Chart from "@/app/layOut/chart/Chart";
import { useRouter } from "next/navigation";

const AdminHome = () => {
  const router =useRouter()
  const token = sessionStorage.getItem("token")
  if(!token){
    // alert("Phải đăng nhập")
    router.push("/login")
  }
  return (
    <div className={styles.container}>
      <div className={styles.menu}>
        <Sidebar />
      </div>
      <div className={styles.content}>
        <Search />
        <div className={styles.cards}>
          <LayoutCard />
        </div>
        <Chart />
      </div>
    </div>
  );
};

export default AdminHome;
