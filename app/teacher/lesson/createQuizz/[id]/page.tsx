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
  const [question, setQuestion] = useState<any>(null);

  //Trở về trang trước
  const handleCancel = () => {
    router.back();
  };

  const [lesson, setLesson] = useState<any>(null);
  const { register,setValue, handleSubmit, formState: { errors } } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });
  
  return (
    <div className="flex">
      <div className={styles.menu}>
        <Sidebar />
      </div>
      <div className={styles.contentmenu}>
        <form>
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
