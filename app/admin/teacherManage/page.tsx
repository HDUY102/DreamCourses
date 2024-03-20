"use client";
import React, { useEffect } from "react";
import { FaPlusCircle, FaFile } from "react-icons/fa";
import Link from "next/link";
import ListTeacher from "./ListTeacher";
import Sidebar from "@/app/admin/sidebar/AdminSidebar";
import styles from "@/app/admin/dashboard.module.css";
import { useTeacherStore } from "@/app/lib/hooks/useTeacherStore";

const TeacherManagePage = () => {
  // const { fetchDataTeacher, isLoadingTeachers } = useTeacherStore();

  // useEffect(() => {
  //   fetchDataTeacher();
  // }, []);

  return (
    <div className="flex ">
      <div className={styles.menu}>
        <Sidebar />
      </div>
      <div className={styles.contentmenu}>
        <div className="ml-8 max-w-[80%] justify-end">
          <div className="flex justify-between mt-8">
            <h1 className="mt-2 ml-4 font-bold">QUẢN LÝ GIẢNG VIÊN</h1>
            <Link href={"/teacher/teacherManage/addAccountTeacher"}>
              <button className="bg-sky-800 text-white rounded-lg p-2 mr-3 hover:text-white hover:border hover:bg-red-500  flex items-center ">
                <FaPlusCircle />
                Tạo tài khoản giảng viên
              </button>
            </Link>
          </div>
          <div className="flex mt-10 mb-6 justify-between">
            <div className="ml-4">
              <p>Tổng số giảng viên hiện tại</p>
              <div className="flex justify-between text-gray-500">
                <FaFile className="text-sky-400" />
                20 bài
              </div>
            </div>
            <div className="ml-4">
              <p>Tổng số giảng viên chưa duyệt</p>
              <div className="flex justify-between text-gray-500">
                <FaFile className="text-sky-400" />3 bài
              </div>
            </div>
            <div className="ml-4">
              <p>Tổng số giảng viên đã duyệt</p>
              <div className="flex justify-between text-gray-500">
                <FaFile className="text-sky-400" />
                17 bài
              </div>
            </div>
          </div>
          <div>
            {/* {isLoadingTeachers ? (
              <div className="text-center text-lg">Loading...</div>
            ) : (
              <ListTeacher />
            )} */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherManagePage;
