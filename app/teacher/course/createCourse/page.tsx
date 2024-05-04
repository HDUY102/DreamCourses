"use client";
import React, { useState } from "react";
import * as z from "zod";
import TitleForm from "./TitleForm";
import { LuLayoutDashboard,LuFolderOpen ,LuBadgeDollarSign,LuFolderLock } from "react-icons/lu";
import styles from "@/app/teacher/Teacher.module.css";
import DescriptionForm from "./DescriptionForm";
import { ImageForm } from "./ImageForm";
import { PriceForm } from "./PriceForm";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import Sidebar from "@/app/teacher/sidebar/TeacherSidebar";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const formSchema = z.object({
  price: z.coerce.number().refine((val) => val % 1000 === 0, {message: "Giá tiền là số nguyên chia hết cho 1000"}),
  titleCourse: z.string().min(1, { message: "Tiêu đề không được bỏ trống" }),
  introduce: z.string().min(1, { message: "Lời giới thiệu không được bỏ trống" }),
});
const CreateCourse = () => {
  const router = useRouter();
  const token = sessionStorage.getItem("token")
  if (!token) {
    router.push('/login')
  }
  const notify: any = () =>toast.success("Tạo khóa học mới thành công!", {
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

  const [imageUrl, setImageUrl] = useState<string>("");
  const handleImageUpload = (url: string) => {
    if (url) {
      setImageUrl(url);
    }
  };

  const onSubmit = async (values: any) => {
    const isPublishValue = isPublished ? true : false;
    const formValues = {
      titleCourse: values.titleCourse,
      price: values.price,
      introduce: values.introduce,
      isPublished: isPublishValue,
      image: imageUrl
    };
    console.log(formValues);
    const respone = await fetch("http://localhost:3000/api/courses", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
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
          <h1 className="mt-2 ml-4 font-bold text-2xl">Tạo Mới Khóa Học</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
            <div>
              <div className="flex items-center gap-x-2">
                <LuLayoutDashboard className={styles.icon} />
                <h2 className="text-xl">Tùy chỉnh khóa học của bạn</h2>
              </div>
              <div {...form.register("titleCourse")}>
                <TitleForm />
                {form.formState.errors.titleCourse && (
                  <p className="text-red-500 ml-4 mt-2 ">
                    {form.formState.errors.titleCourse.message}
                  </p>
                )}
              </div>
              <div {...form.register("introduce")}>
                <DescriptionForm />
                {form.formState.errors.introduce && (
                  <p className="text-red-500 ml-4">
                    {form.formState.errors.introduce.message}
                  </p>
                )}
              </div>
              <div>
                <ImageForm onImageUpload={handleImageUpload}/>
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
                  <LuBadgeDollarSign className={styles.icon} />
                  <h2 className="text-xl">Giá</h2>
                </div>
                <div {...form.register("price")}>
                  <PriceForm />
                  {form.formState.errors.price && <p className="text-red-500 ml-4">{form.formState.errors.price.message}</p>}
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-end mb-3">
            <Link href={"/teacher/course"}>
              <button className="bg-sky-800 text-white rounded-lg mr-1 hover:text-white p-2 hover:bg-red-500 ">
                Hủy
              </button>
            </Link>
            <Button
              type="submit"
              className="bg-sky-800 text-white rounded-lg mr-3 hover:text-white p-4  hover:bg-red-500 "
              variant="ghost"
            >
              Tạo
            </Button>
            <ToastContainer />
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateCourse;
