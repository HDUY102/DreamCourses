import React from "react";
import styles from "@/app/teacher/sidebar/TeacherSidebar.module.css";
import {
  MdLogout,
  MdDashboard,
  MdSupervisedUserCircle,
  MdShoppingBag,
  MdAttachMoney,
  MdWork,
  MdAnalytics,
  MdPeople,
  MdOutlineSettings,
  MdHelpCenter,
  MdListAlt,
  MdCalendarMonth,
  MdEmojiPeople,
  MdMenuBook ,
} from "react-icons/md";
import MenuLink from "./menuLink/MenuLink";
// import { signOut } from '@/auth';

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
        title: "Quản lý thống kê",
        path: "/teacher/statistic",
        icon: <MdAnalytics />,
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
const Sidebar = async () => {
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
                <MenuLink item={item} key={item.title} />
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

export default Sidebar;
