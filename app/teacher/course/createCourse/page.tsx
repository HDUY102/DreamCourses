"use client";
import React, { useState } from "react";
import * as z from "zod";
import TitleForm from "./TitleForm";
import { LuLayoutDashboard } from "react-icons/lu";
import styles from "@/app/teacher/Teacher.module.css";
import DiscriptionForm from "./DescriptionForm";
import { ImageForm } from "./ImageForm";
import { ChaptersForm } from "./ChapterForm";
import { PriceForm } from "./PriceForm";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import Sidebar from "@/app/teacher/sidebar/TeacherSidebar";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { useRouter } from "next/navigation";
import { ToastContainer,toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import toast, { Toaster } from "react-hot-toast"

const formSchema = z.object({
  price: z.coerce.number(),
});
const CourseManage = () => {
  const notify:any = () => toast.success("Thêm mới thành công!",{
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });
  const router = useRouter();
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const respone = await fetch("http://localhost:3000/api/courses/addCourse", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (respone.ok) {
      alert("Thêm Thành Công");
      router.push("/teacher/course");
    } else {
      console.error("Error during Create:", respone.statusText);
    }
  };


  return (
    <div className="flex">
      <div className={styles.menu}>
        <Sidebar />
      </div>
      <div className={styles.contentmenu}>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
              <h1 className="mt-2 ml-4 font-bold text-2xl">Tạo Mới Khóa Học</h1>
                
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
              <div>
                <div className="flex items-center gap-x-2">
                  <LuLayoutDashboard className={styles.icon} />
                  <h2 className="text-xl">Tùy chỉnh khóa học của bạn</h2>
                </div>
                <TitleForm />
                <DiscriptionForm />
                <ImageForm />
              </div>
              <div className="space-y-6">
                <div>
                  <div className="flex items-center gap-x-2">
                    <LuLayoutDashboard className={styles.icon} />
                    <h2 className="text-xl">Chương</h2>
                  </div>
                  <ChaptersForm />
                </div>
                <div>
                  <div className="flex items-center gap-x-2">
                    <LuLayoutDashboard className={styles.icon} />
                    <h2 className="text-xl">Giá</h2>
                  </div>
                  <PriceForm />
                </div>
              </div>
            </div>
            <div className="flex justify-end mb-3">
                  <Link href={"/teacher/course"}>
                    <button className="bg-sky-800 text-white rounded-lg mr-1 hover:text-white p-2 hover:bg-red-500 ">
                      Hủy
                    </button>
                  </Link>
                  <Button onClick={notify} className="bg-sky-800 text-white rounded-lg mr-3 hover:text-white p-4  hover:bg-red-500 " variant="ghost">
                    Tạo
                  </Button>
                  <ToastContainer />
                </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default CourseManage;
