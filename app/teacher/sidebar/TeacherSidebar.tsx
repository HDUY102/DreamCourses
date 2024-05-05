"use client"
import React, {useEffect,useState} from "react";
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
import { useRouter } from 'next/navigation';

const TeacherSidebar = () => {
  const [showStatsDropdown, setShowStatsDropdown] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const toggleStatsDropdown = () => {
    setShowStatsDropdown(!showStatsDropdown);
    setIsDropdownOpen(!isDropdownOpen); 
  };
  const router = useRouter();

  // Set trạng thái name cho teacher
  const [teacherName, setTeacherName] = useState("")
  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (!token) {
      router.push("/login");
    } else {
      const fetchNameTeacher = async () => {
        try {
          const response = await fetch("/api/teacher", {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          if (!response.ok) {
            throw new Error("Failed to fetch courses");
          }
          const data = await response.json();
          setTeacherName(data.username);
        } catch (error) {
          console.error("Error fetching courses:", error);
        }
      };

      fetchNameTeacher();
    }
  }, []);
  
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
  ];

  return (
    <div className={styles.container}>
      <div className={styles.userDetail}>
        <div className="text-center uppercase">
          <span className={styles.userTitle}>
            Xin chào<br></br>
            {teacherName}
          </span>
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
        Logout
      </div>
    </div>
  );
};

export default TeacherSidebar;
