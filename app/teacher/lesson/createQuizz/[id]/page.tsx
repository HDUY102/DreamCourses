"use client";
import React, { useState,useEffect } from "react";
import * as z from "zod";
import { LuLayoutDashboard,LuFile,LuBookOpenCheck, LuArrowLeft  } from "react-icons/lu";
import styles from "@/app/teacher/Teacher.module.css";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Sidebar from "@/app/teacher/sidebar/TeacherSidebar";
import { useParams, useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import QuizzForm from "./QuizzForm";
import { QuestionForm } from "./QuestionForm";
import {FaQuestionCircle } from "react-icons/fa";

const formSchema = z.object({
  titleQuizz: z.string().min(1, { message: "Nội dung không được bỏ trống" })
});

const CreateQuizz = () => {
  const router = useRouter();
  const token = sessionStorage.getItem("token")
  if (!token) {
    router.push('/login')
  }
  const notify: any = () =>toast.success("Tạo Quizz bài học thành công!", {
      position: "top-right",
      autoClose: 2500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
  });

  const [question, setQuestion] = useState<any>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const [isPublished, setIsLocked] = useState(true);
  const toggleLock = () => {
    setIsLocked(!isPublished);
  };

  //Trở về trang trước
  const handleCancel = () => {
    router.back();
  };

  const { id } = useParams();
  const idLesson = parseInt(id as string);
  const [lesson, setLesson] = useState<any>(null);
  const { register,setValue, handleSubmit, formState: { errors } } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });
  

  const onSubmit = async (values: any) => {
    const isPublishValue = isPublished ? true : false;
    const formValues = {
      titleLessons: values.titleLessons,
      isPublished: isPublishValue
    };
    console.log(formValues);
    const respone = await fetch(`/api/lesson/${idLesson}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formValues),
    });

    if (respone.ok) {
      notify();
      setTimeout(() => {
        router.back();
      }, 3000);
    } else {
      console.error("Error during update:", respone.statusText);
    }
  };

  return (
    <div className="flex">
      <div className={styles.menu}>
        <Sidebar />
      </div>
      <div className={styles.contentmenu}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <h1 className="mt-2 ml-4 font-bold text-2xl">Tạo Quizz</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
            <div>
              <div {...register("titleQuizz")}>
                <div className="flex items-center gap-x-2 mt-3 font-normal">
                  <LuFile className={styles.icon} />
                  <h2 className="text-lg">Tên Quizz</h2>
                </div>
                <QuizzForm initialData={lesson}/>
                {errors.titleQuizz && (
                  <p className="text-red-500 ml-4 mt-2 ">
                    {errors.titleQuizz.message}
                  </p>
                )}
              </div>
            </div>
            <div className="space-y-6">
                {/* <div className="flex justify-end mr-4">
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
                </div> */}
                <div className="flex items-center gap-x-2">
                    <FaQuestionCircle className={styles.icon} />
                    <h2 className="text-xl">Danh sách câu hỏi</h2>
                </div>
                <QuestionForm initialData={question}/>
            </div>
          </div>
          <div className="flex justify-end mt-6">
            <button type="button" className="flex items-center bg-sky-800 text-white rounded-lg mr-1 hover:text-white p-2 hover:bg-red-500 " onClick={handleCancel}>
              <LuArrowLeft />
              Quay lại
            </button>
            <ToastContainer />
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateQuizz;
