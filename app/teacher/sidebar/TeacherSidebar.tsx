"use client"
import React, {useState} from "react";
import styles from "@/app/teacher/sidebar/TeacherSidebar.module.css";
import {
  MdLogout,
  MdDashboard,
  MdOutlineSettings,
  MdArrowDropDownCircle,
  MdArrowDropUp,
  MdMenuBook ,
  MdGroups,
  MdMonetizationOn,
} from "react-icons/md";
import MenuLink from "./menuLink/MenuLink";
// import { signOut } from '@/auth';

const TeacherSidebar = () => {
  const [showStatsDropdown, setShowStatsDropdown] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const toggleStatsDropdown = () => {
    setShowStatsDropdown(!showStatsDropdown);
    setIsDropdownOpen(!isDropdownOpen); 
  };

  const menuItems = [
    {
      list: [
        {
          title: "Trang Chủ",
          path: "/teacher",
          icon: <MdDashboard />,
        },
        {
          title: "Quản lý khóa học",
          path: "/teacher/course",
          icon: <MdMenuBook  />,
        },
        {
          title: "Thống Kê",
          path: "",
          icon: (
            <span>
              {/* <MdAnalytics /> */}
              {isDropdownOpen ? <MdArrowDropUp /> : <MdArrowDropDownCircle  />}
            </span>
          ),
          submenu: [
            { title: "Thống kê doanh thu", path: "/teacher/statistics/revenueStatistic",icon: <MdMonetizationOn /> },
            { title: "Thống kê số học viên", path: "/teacher/statistics/studentStatistic",icon: <MdGroups /> },
          ]
        },
      ],
    },
    {
      list: [
        {
          title: "Cài Đặt",
          path: "/teacher/settings",
          icon: <MdOutlineSettings />,
        },
        {
          title: "Đăng Xuất",
          path: "/login",
          icon: <MdLogout />,
          // onClick: handleLogout(),
        },
      ],
    },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.userDetail}>
        <div className="text-center uppercase">
          <span className={styles.userTitle}>TEACHER</span>
        </div>
        <ul className={styles.list}>
          {menuItems.map((cat) => (
            <li>
                {cat.list.map((item) => (
                  <React.Fragment key={item.title}>
                  {item.title === "Thống Kê" ? (
                    <div onClick={toggleStatsDropdown}>
                      <MenuLink item={item} key={item.title} />
                      {showStatsDropdown && (
                        <ul className={styles.cat}>
                          {item.submenu.map((subitem:any) => (
                            <MenuLink item={subitem} key={subitem.title} />
                          ))}
                        </ul>
                      )}
                    </div>
                  ) : (
                    <MenuLink item={item} key={item.title} />
                  )}
                </React.Fragment>
              ))}
            </li>
          ))}
        </ul>
      </div>
      {/* <form
      // action={async () => {
      //   "use server";
      //   await signOut();
      // }}
      >
        <button className={styles.logout}>
          <MdLogout />
          Logout
        </button>
      </form> */}
    </div>
  );
};

export default TeacherSidebar;
