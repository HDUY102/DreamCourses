"use client";
import React, { useState } from "react";
import * as z from "zod";
import TitleForm from "@/app/teacher/course/createCourse/TitleForm";
import { LuLayoutDashboard,LuVideo ,LuBookOpenCheck, LuBookOpen } from "react-icons/lu";
import styles from "@/app/teacher/Teacher.module.css";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Sidebar from "@/app/teacher/sidebar/TeacherSidebar";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AttachmentLesson } from "@/app/teacher/lesson/createLesson/Attachment";
import { VideoLesson } from "@/app/teacher/lesson/createLesson/VideoLesson";

const formSchema = z.object({
  titleLessons: z.string().min(1, { message: "Tiêu đề không được bỏ trống" })
});
const CreateLesson = () => {
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

  const [attachmentUrl, setAttachmentUrl] = useState<string>("");
  const handleAttachmentUpload = (url: string) => {
    if (url) {
      setAttachmentUrl(url);
    }
  };
  console.log("url: "+ attachmentUrl)

  const [isPublished, setIsLocked] = useState(true);
  const toggleLock = () => {
    setIsLocked(!isPublished);
  };

  //Trở về trang trước
  const handleCancel = () => {
    router.back();
  };

  const onSubmit = async (values: any) => {
    const isPublishValue = isPublished ? 1 : 0;
    const formValues = {
      titleLessons: values.titleLessons,
      isPublished: isPublishValue,
      chapterId: 13,
    };
    console.log(formValues);
    const respone = await fetch("http://localhost:3000/api/courses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formValues),
    });

    if (respone.ok) {
      notify();
      setTimeout(() => {
        router.push("/teacher/course");
      }, 2000);
      setTimeout(() => {
        window.location.reload();
      }, 3000);
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
          <h1 className="mt-2 ml-4 font-bold text-2xl">Tạo Mới Bài Học</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
            <div>
              <div className="flex items-center gap-x-2">
                <LuLayoutDashboard className={styles.icon} />
                <h2 className="text-xl">Tùy chỉnh bài học của bạn</h2>
              </div>
              <div {...form.register("titleLessons")}>
                <TitleForm />
                {form.formState.errors.titleLessons && (
                  <p className="text-red-500 ml-4 mt-2 ">
                    {form.formState.errors.titleLessons.message}
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

export default CreateLesson;
