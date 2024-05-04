"use client";
import React, { useState } from "react";
import styles from "@/app/adminn/sidebar/AdminSidebar.module.css";
import {
  MdLogout,
  MdDashboard,
  MdSwitchAccount,
  MdGroups ,
  MdArrowDropDownCircle  ,
  MdArrowDropUp ,
  MdMonetizationOn ,
} from "react-icons/md";
import MenuLink from "./menuLink/MenuLink";
import { useRouter } from 'next/navigation';

const AdminSidebar = () => {
  const [showStatsDropdown, setShowStatsDropdown] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const toggleStatsDropdown = () => {
    setShowStatsDropdown(!showStatsDropdown);
    setIsDropdownOpen(!isDropdownOpen); 
  };
  const router = useRouter();
  const handleLogout = async () => {
    try {
      const response = await fetch('/api/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.ok) {
        sessionStorage.removeItem('token');
        router.push('/login');
      } else {
        throw new Error('Logout failed');
      }
    } catch (error) {
      console.error('Logout error:', error);
    }
  };
  const menuItems = [
    {
      list: [
        {
          title: "Trang Chủ",
          path: "/adminn",
          icon: <MdDashboard />,
        },
        {
          title: "Tài Khoản Giảng Viên",
          path: "/adminn/teacherManage",
          icon: <MdSwitchAccount />,
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
            { title: "Thống kê doanh thu", path: "/adminn/statisticsManage/revenueStatistic",icon: <MdMonetizationOn /> },
            { title: "Thống kê học viên", path: "/adminn/statisticsManage/studentStatistic",icon: <MdGroups /> },
          ]
        },
      ],
    },
  ];
  return (
    <div className={styles.container}>
      <div className={styles.userDetail}>
        <div className="text-center uppercase">
          <span className={styles.userTitle}>Admin</span>
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
      <div className={styles.logout} onClick={handleLogout}>
        <MdLogout />
        Đăng xuất
      </div>
    </div>
  );
};

export default AdminSidebar;
