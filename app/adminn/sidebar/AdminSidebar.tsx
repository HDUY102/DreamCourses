"use client";
import React, { useState } from "react";
import styles from "@/app/adminn/sidebar/AdminSidebar.module.css";
import {
  MdLogout,
  MdDashboard,
  MdAnalytics,
  MdOutlineSettings,
  MdSwitchAccount,
  MdGroups ,
  MdArrowDropDownCircle  ,
  MdArrowDropUp ,
  MdSupervisedUserCircle,
  MdShoppingBag,
  MdMonetizationOn ,
  MdWork,
  MdPeople,
  MdHelpCenter,
  MdListAlt,
  MdCalendarMonth,
  MdEmojiPeople,
} from "react-icons/md";
import MenuLink from "./menuLink/MenuLink";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
// import { cookies } from "next/headers";

const handleLogout = () => {
  // const router = useRouter();
  Cookies.remove("dctoken");
  // router.push("/login")
};

const AdminSidebar = () => {
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
    {
      list: [
        {
          title: "Đăng Xuất",
          path: "/login",
          icon: <MdLogout />,
          onClick: handleLogout(),
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

export default AdminSidebar;
