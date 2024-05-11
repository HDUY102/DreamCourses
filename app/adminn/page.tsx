'use client'
import React, { useEffect } from "react";
import Sidebar from "@/app/adminn/sidebar/AdminSidebar";
import styles from "@/app/adminn/dashboard.module.css";
import Search from "@/app/layOut/search/Search";
import LayoutCard from "@/app/layOut/layoutCard/LayoutCard";
import Chart from "@/app/layOut/chart/Chart";
import { useRouter } from "next/navigation";
import { verify, JwtPayload } from "jsonwebtoken";

const AdminHome = () => {
  const router =useRouter()
  const token = sessionStorage.getItem("token")
  // if(!token){
  //   // alert("Phải đăng nhập")
  //   router.push("/login")
  // }else{
  //   const decodedToken = verify(token, "secret-key");
  //   const user = decodedToken as JwtPayload;
  //   const roleUser = parseInt(user.roleId)
  //   if(roleUser !== 1){
  //     alert("Tài khoản không có quyền truy cập")
  //     router.push("/login")
  //   }
  //   else{
  //     alert("Chào mừng admin")
  //   }
  // }
  useEffect(() => {
    const checkToken = async () => {
      try {
        if (!token) {
          router.push("/login");
          return;
        }
        
        const decodedToken = verify(token, "secret-key");
        const user = decodedToken as JwtPayload;
        const roleId = parseInt(user.roleId);
  
        if (roleId === 1) {
          alert("Chào mừng admin");
        } else if (roleId === 2) {
          router.push("/");
          alert("Tài khoản không có quyền truy cập");
        } else if (roleId === 3) {
          router.push("/teacher");
          alert("Tài khoản không có quyền truy cập");
        }
      } catch (error) {
        console.error("Lỗi xác thực token:", error);
        router.push("/login");
      }
    };
  
    checkToken();
  }, [router, token]);
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
