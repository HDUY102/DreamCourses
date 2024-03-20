// "use server"
"use client"
import React from "react";
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
        path: "/dashboard/courses",
        icon: <MdAnalytics />,
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
