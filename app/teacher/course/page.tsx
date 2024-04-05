"use client";
import React from "react";
import CreateCoursePage from "@/app/teacher/course/createCourse/page";
import styles from "@/app/teacher/Teacher.module.css";
import Sidebar from "@/app/teacher/sidebar/TeacherSidebar";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { FaPlusCircle, FaFile } from "react-icons/fa";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";


const formSchema = z.object({
  price: z.coerce.number(),
});

const CourseManage = () => {
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
      alert("Tạo Thành Công");
      router.push("/teacher");
    } else {
      console.error("Error during Create:", respone.statusText);
    }
  };

  return (
    <div className="flex ">
      <div className={styles.menu}>
        <Sidebar />
      </div>
      <div className={styles.contentmenu}>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="">
              <div className="flex justify-between mt-8">
                <h1 className="mt-2 ml-4 font-bold text-2xl">QUẢN LÝ KHÓA HỌC</h1>
                <Link href={"/teacher/course/createCourse"}>
                  <button className="flex items-center bg-sky-800 text-white rounded-lg p-2 mr-3 hover:text-white hover:border hover:bg-red-500 ">
                    <FaPlusCircle />
                    Thêm mới khóa học
                  </button>
                </Link>
              </div>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default CourseManage;
