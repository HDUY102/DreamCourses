"use client";
import React, { useEffect, useState } from "react";
import * as z from "zod";
import { LuLayoutDashboard, LuListTodo,LuFolderOpen , LuFolderLock  } from "react-icons/lu";
import styles from "@/app/teacher/Teacher.module.css";
import { LessonForm } from "./LessonForm";
import TitleChapter from "../TitleChapter";
import DescriptionChapter from "../DescriptionChapter";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Sidebar from "@/app/teacher/sidebar/TeacherSidebar";
import { useParams, useRouter } from "next/navigation";
import { ToastContainer,toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const formSchema = z.object({
  titleChapter: z.string().min(1, { message: "Tiêu đề chapter không được bỏ trống" }),
  description: z.string().min(1, { message: "Mô tả không được bỏ trống" }),
});

const UpdateChapter = () => {
  const router = useRouter();
  const token = sessionStorage.getItem("token")
  if (!token) {
    router.push('/login')
  }
  const [chapter, setChapter] = useState<any>(null);
  
  const notify: any = () =>
    toast.success("Cập nhật chương thành công!", {
      position: "top-right",
      autoClose: 500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
  });

  //state button published
  const [isPublished, setIsLocked] = useState(true);
  const toggleLock = () => {
    setIsLocked(!isPublished);
  };
  
  //trở về trang updatecouse trước đó
  const handleCancel = () => {
    router.back();
  };

  
  const { register,setValue, handleSubmit, formState: { errors } } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });
  // set value and funtion onSubmit
  const { id } = useParams();
  const idChapter = parseInt(id as string);
  useEffect(() => {
    const fetchChapter = async () => {
      try {
        const response = await fetch(`/api/chapter/${idChapter}`,{
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (response.ok) {
          const data = await response.json();
          setValue("titleChapter", data.titleChapter);
          setValue("description", data.description);
          setIsLocked(data.isPublished)
        } else {
          console.error("Error fetching chapter:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching chapter:", error);
      }
    };

    fetchChapter();
  }, [idChapter,setValue]);
  
  //update chapter
  const onSubmit = async (values: any) => {
    const isPublishValue = isPublished ? true : false;
    const formValues = {
      titleChapter: values.titleChapter,
      description: values.description,
      isPublished: isPublishValue,
    };
    const respone = await fetch(`/api/chapter/${idChapter}`,{
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formValues),
    }
  );

  if (respone.ok) {
    notify();
    setTimeout(()=>{
      router.back();
    },1000)
  } else {
    console.error("Error during updateChapter:", respone.statusText);
  }
};

  return (
    <div className="flex">
      <div className={styles.menu}>
        <Sidebar />
      </div>
      <div className={styles.contentmenu}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <h1 className="mt-2 ml-4 font-bold text-2xl">Cập Nhật Chương</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
            <div>
              <div className="flex items-center gap-x-2">
                <LuLayoutDashboard className={styles.icon} />
                <h2 className="text-xl">Tùy chỉnh chương của khóa học</h2>
              </div>
              <div {...register("titleChapter")}>
                <TitleChapter />
                {errors.titleChapter && (
                  <p className="text-red-500 ml-4 mt-2 ">
                    {errors.titleChapter.message}
                  </p>
                )}
              </div>
              <div {...register("description")}>
                <DescriptionChapter />
                {errors.description && (
                  <p className="text-red-500 ml-4">
                    {errors.description.message}
                  </p>
                )}
              </div>
            </div>
            <div className="space-y-4 mt-4">
              <div className="flex justify-end mr-4">
                {isPublished ? (
                  <button
                    type="button"
                    onClick={toggleLock}
                    className="bg-green-400 text-white rounded-lg mr-2 text-sm p-2 flex items-center"
                  >
                    <LuFolderOpen  className="mr-1 text-base" />
                    Công khai
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={toggleLock}
                    className="bg-red-400 text-white rounded-lg mr-2 p-2 text-sm flex items-center"
                  >
                    <LuFolderLock  className="mr-1 text-base" />
                    Không công khai
                  </button>
                )}
              </div>
              <div>
                <div className="flex items-center gap-x-2">
                  <LuListTodo className={styles.icon} />
                  <h2 className="text-xl">Bài học</h2>
                </div>
                <LessonForm initialData={chapter} />
              </div>
            </div>
          </div>
          <div className="flex justify-end mb-3">
            <button type="button" className="bg-sky-800 text-white rounded-lg mr-1 hover:text-white p-2 hover:bg-red-500" onClick={handleCancel}>
              Hủy
            </button>
            <Button
              type="submit"
              className="bg-sky-800 text-white rounded-lg mr-3 hover:text-white p-4  hover:bg-red-500 "
              variant="ghost"
            >
              Cập nhật
            </Button>
            <ToastContainer />
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateChapter;
