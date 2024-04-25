"use client";
import React, { useState,useEffect } from "react";
import * as z from "zod";
import { LuLayoutDashboard,LuVideo ,LuBookOpenCheck, LuBookOpen } from "react-icons/lu";
import styles from "@/app/teacher/Teacher.module.css";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Sidebar from "@/app/teacher/sidebar/TeacherSidebar";
import { useParams, useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import { AttachmentLesson } from "@/app/teacher/lesson/Attachment";
import { VideoLesson } from "@/app/teacher/lesson/VideoLesson";
import "react-toastify/dist/ReactToastify.css";
import TitleLessons from "../../TitleLesson";

const formSchema = z.object({
  titleLessons: z.string().min(1, { message: "Tiêu đề bài học không được bỏ trống" })
});
const UpdateLesson = () => {
  const router = useRouter();
  const notify: any = () =>toast.success("Sửa thông tin bài học thành công!", {
      position: "top-right",
      autoClose: 2500,
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

  const [attachmentUrl, setAttachmentUrl] = useState<string>("");
  const handleAttachmentUpload = (url: string) => {
    if (url) {
      setAttachmentUrl(url);
    }
  };
  // console.log("url: "+ attachmentUrl)

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
  const [chapter, setChapters] = useState<any>(null);
  const { register,setValue, handleSubmit, formState: { errors } } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });
  useEffect(() => {
    const fetchLesson = async () => {
      try {
        const response = await fetch(`/api/lesson/${idLesson}`,{
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (response.ok) {
          const data = await response.json();
          setChapters(data);
          setValue("titleLessons", data.titleLessons);
          setIsLocked(data.isPublished)
        } else {
          console.error("Error fetching course:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching course:", error);
      }
    };

    fetchLesson();
  }, [idLesson, setValue]);

  const idChapter = parseInt(id as string);
  const onSubmit = async (values: any) => {
    const isPublishValue = isPublished ? true : false;
    const formValues = {
      titleLessons: values.titleLessons,
      isPublished: isPublishValue,
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
          <h1 className="mt-2 ml-4 font-bold text-2xl">Tạo Mới Bài Học</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
            <div>
              <div className="flex items-center gap-x-2">
                <LuLayoutDashboard className={styles.icon} />
                <h2 className="text-xl">Tùy chỉnh bài học của bạn</h2>
              </div>
              <div {...register("titleLessons")}>
                <TitleLessons />
                {errors.titleLessons && (
                  <p className="text-red-500 ml-4 mt-2 ">
                    {errors.titleLessons.message}
                  </p>
                )}
              </div>
              <div>
                <AttachmentLesson onAttachUpload={handleAttachmentUpload}/>
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
                  <LuVideo className={styles.icon} />
                  <h2 className="text-xl">Video</h2>
                </div>
                <VideoLesson/>
              </div>
            </div>
          </div>
          <div className="flex justify-end mb-3">
            <button className="bg-sky-800 text-white rounded-lg mr-1 hover:text-white p-2 hover:bg-red-500 " onClick={handleCancel}>
              Hủy
            </button>
            <Button
              type="submit"
              className="bg-sky-800 text-white rounded-lg mr-3 hover:text-white p-4  hover:bg-red-500 "
              variant="ghost"
            >
              Xác Nhận
            </Button>
            <ToastContainer />
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateLesson;
