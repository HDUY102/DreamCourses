"use client";
import React, { useState } from "react";
import * as z from "zod";
import TitleForm from "@/app/teacher/course/createCourse/TitleForm";
import { LuLayoutDashboard,LuListTodo,LuBookOpenCheck, LuBookOpen } from "react-icons/lu";
import styles from "@/app/teacher/Teacher.module.css";
import DescriptionForm from "@/app/teacher/course/createCourse/DescriptionForm";
import LessonPage from "../../lesson/page";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import Sidebar from "@/app/teacher/sidebar/TeacherSidebar";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const formSchema = z.object({
  titleChapter: z.string().min(1, { message: "Tiêu đề chương không được bỏ trống" }),
  description: z.string().min(1, { message: "Lời giới thiệu về chương không được bỏ trống" }),
});
const CreateCourse = () => {
  const router = useRouter();
  const notify: any = () =>toast.success("Thêm mới thành công!", {
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

  const [isPublished, setIsLocked] = useState(true);
  const toggleLock = () => {
    setIsLocked(!isPublished);
  };

  const onSubmit = async (values: any) => {
    const isPublishValue = isPublished ? 1 : 0;
    const formValues = {
      titleCourse: values.titleCourse,
      description: values.description,
      isPublic: isPublishValue,
      courseId: 4,
    };
    console.log(formValues);
    const respone = await fetch("http://localhost:3000/api/chapter", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formValues),
    });

    if (respone.ok) {
      notify();
      setTimeout(() => {
        router.push("/teacher/course/createCourse");
      }, 2000)
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
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <h1 className="mt-2 ml-4 font-bold text-2xl">Tạo Mới Chương Học</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
            <div>
              <div className="flex items-center gap-x-2">
                <LuLayoutDashboard className={styles.icon} />
                <h2 className="text-xl">Tùy chỉnh chương</h2>
              </div>
              <div {...form.register("titleChapter")}>
                <TitleForm />
                {form.formState.errors.titleChapter && (
                  <p className="text-red-500 ml-4 mt-2 ">
                    {form.formState.errors.titleChapter.message}
                  </p>
                )}
              </div>
              <div {...form.register("description")}>
                <DescriptionForm />
                {form.formState.errors.description && (
                  <p className="text-red-500 ml-4">
                    {form.formState.errors.description.message}
                  </p>
                )}
              </div>
            </div>
            <div className="space-y-6">
            <div className="flex justify-end mr-4">
                {isPublished ? (
                  <button
                    type="button"
                    onClick={toggleLock}
                    className="bg-green-400 text-white rounded-lg mr-2 text-sm p-2 flex items-center"
                  >
                    <LuBookOpenCheck className="mr-1 text-base" />
                    Công khai
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={toggleLock}
                    className="bg-red-400 text-white rounded-lg mr-2 p-2 text-sm flex items-center"
                  >
                    <LuBookOpen className="mr-1 text-base" />
                    Không công khai
                  </button>
                )}
              </div>
              <div>
                <div className="flex items-center gap-x-2">
                  <LuListTodo className={styles.icon} />
                  <h2 className="text-xl">Bài Học</h2>
                </div>
                <LessonPage />
              </div>
            </div>
          </div>
          <div className="flex justify-end mb-3">
            <Link href={"/teacher/course/createCourse"}>
              <button className="bg-sky-800 text-white rounded-lg mr-1 hover:text-white p-2 hover:bg-red-500 ">
                Hủy
              </button>
            </Link>
            <Button
              type="submit"
              className="bg-sky-800 text-white rounded-lg mr-3 hover:text-white p-4  hover:bg-red-500 "
              variant="ghost"
            >
              Tạo Chương
            </Button>
            <ToastContainer />
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateCourse;