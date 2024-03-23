// "use server"
"use client"
import React, { useState } from "react";
import styles from "@/app/admin/sidebar/AdminSidebar.module.css";
import {
  MdLogout,
  MdDashboard,
  MdAnalytics,
  MdOutlineSettings,
  MdSwitchAccount,   
  MdSupervisedUserCircle,
  MdShoppingBag,
  MdAttachMoney,
  MdWork,
  MdPeople,
  MdHelpCenter,
  MdListAlt,
  MdCalendarMonth,
  MdEmojiPeople,
} from "react-icons/md";
import MenuLink from "./menuLink/MenuLink";
import { signOut } from 'next-auth/react';
import { useRouter } from "next/navigation";
import Cookies from 'js-cookie';
// import { cookies } from "next/headers";

const handleLogout = () =>{
  // const router = useRouter();
  Cookies.remove("dctoken")
  // router.push("/login")
}

const menuItems = [
  {
    title: "Quản lý",
    list: [
      {
        title: "Trang Chủ",   
        path: "/admin",
        icon: <MdDashboard />,
      },
      {
        title: "Tài Khoản Giảng Viên",
        path: "/admin/teacherManage",
        icon: <MdSwitchAccount/>,
      },
      {
        title: "Thống Kê",
        path: "",
        button: "Thống ke",
        icon: <MdAnalytics />,
        submenu: true,
        subMenuItems: [
          { title: "Doanh Thu", path:"/statisticsManage/doanhthu"},
          { title: "Doanh ", path:"/statisticsManage/doanhthu"},
          { title: " Thu", path:"/statisticsManage/doanhthu"},
        ]
      },
    ],
  },
  {
    title: "User",
    list: [
      {
        title: "Cài Đặt",
        path: "/dashboard/settings",
        icon: <MdOutlineSettings />,
      },
      {
        title: "Đăng Xuất",
        path: "/login",
        icon: <MdLogout />,
        onClick: handleLogout()
      }
    ],
  },
];
const Sidebar =  () => {
  const [showStatsDropdown, setShowStatsDropdown] = useState(false); // State để theo dõi trạng thái của dropdown

  const toggleStatsDropdown = () => {
    setShowStatsDropdown(!showStatsDropdown); // Hàm xử lý sự kiện để mở hoặc đóng dropdown
  };
  return (
    <div className={styles.container}>
        <div className={styles.userDetail}>
          <div className="text-center uppercase">
            <span className={styles.userTitle}>Admin</span>
          </div>
          <ul className={styles.list}>
            {menuItems.map((cat) => (
              <li key={cat.title}>
                <span className={styles.cat}>{cat.title}</span>
                {cat.list.map((item) => (
                  <MenuLink item={item} key={item.title} />
                ))}
              </li>
            ))}
          </ul>
        </div>
        {/* <div className={styles.dropdown}>
        <span className={styles.cat} onClick={toggleStatsDropdown}>Thống Kê</span>
        {showStatsDropdown && menuItems[0].list[2].submenu && (
          <ul className={styles.submenu}>
            {menuItems[0].list[2].subMenuItems.map((item:any) => (
              <MenuLink item={item} key={item.title} />
            ))}
          </ul>
        )}
      </div> */}
      {/* <form 
      action={async () => {
        "use server";
        await signOut();
      }}
      >
        <button className={styles.logout}>
          <MdLogout />
          Logout
        </button>
      </form> */}
      {/* <form onSubmit={handleLogout}>
        <button type="submit" className={styles.logout}>
          <MdLogout />
          Logout
        </button>
      </form> */}
    </div>
  );
};

export default Sidebar;
