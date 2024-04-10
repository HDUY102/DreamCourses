"use client";
import React, { useEffect, useState } from "react";
import * as z from "zod";
import { LuLayoutDashboard } from "react-icons/lu";
import styles from "@/app/teacher/Teacher.module.css";
import TitleForm from "../../createCourse/TitleForm";
import DescriptionForm from "../../createCourse/DescriptionForm";
import { ImageForm } from "../../createCourse/ImageForm";
import { ChaptersForm } from "../../createCourse/ChapterForm";
import { PriceForm } from "../../createCourse/PriceForm";
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
import { useParams, useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import prisma from "@/prisma/client";
import { useCourseStore } from "@/app/lib/hooks/useCourseStore";

interface PublishedProps {
  disabled: boolean;
  isPublished: boolean;
}

const formSchema = z.object({
  price: z.coerce.number().refine((val) => val % 1000 === 0, {message: "Giá tiền là số nguyên chia hết cho 1000",}),
  titleCourse: z.string().min(1, { message: "Tiêu đề không được bỏ trống" }),
  introduce: z.string().min(1, { message: "Lời giới thiệu không được bỏ trống" }),
});

const UpdateCourse = () => {
  const router = useRouter();
  const notify: any = () =>
    toast.success("Cập nhật thành công!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });

  const {setValue,formState: { errors }} = useForm();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });
  const { id } = useParams();
  // const idCourse = Array.isArray(id) ? parseInt(id[0]) : parseInt(id as string);
  const idCourse = parseInt(id as string);

  const [courseTest, setCourse] = useState<any>(null);
  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/courses/${idCourse}`,{
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          }
        });
        if (response.ok) {
          const data = await response.json();
          setCourse(data);
          form.setValue("titleCourse", data.titleCourse);
          form.setValue("introduce", data.introduce);
          form.setValue("price", data.price);
        } else {
          console.error("Error fetching course:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching course:", error);
      }
    };

    fetchCourse();
  }, [idCourse, setValue]);

  const onSubmit = async (values: any) => {
    const formValues = {
      titleCourse: values.titleCourse,
      price: values.price,
      introduce: values.introduce,
      // image: values.image,
      teacherId: 13,
    };
    console.log(formValues);
    const respone = await fetch(
      `http://localhost:3000/api/courses/${idCourse}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formValues),
      }
    );

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
          {/* <div className="flex items-center gap-x-2">
            <Button
              onClick={onPublished}
              // disabled={disabled}
              size="sm"
              // className="bg-sky-800 text-white rounded-lg mr-3 hover:text-white p-4  hover:bg-red-500 "
              variant="outline"
            >
              {isPublished ? "Không công khai" : "Công khai"}
            </Button>
          </div> */}
          <h1 className="mt-2 ml-4 font-bold text-2xl">Cập Nhật Khóa Học</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
            <div>
              <div className="flex items-center gap-x-2">
                <LuLayoutDashboard className={styles.icon} />
                <h2 className="text-xl">Tùy chỉnh khóa học của bạn</h2>
              </div>
              <div {...form.register("titleCourse")} >
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
              {/* <ImageForm /> */}
            </div>
            <div className="space-y-6">
              <div>
                <div className="flex items-center gap-x-2">
                  <LuLayoutDashboard className={styles.icon} />
                  <h2 className="text-xl">Chương</h2>
                </div>
                {/* <ChaptersForm /> */}
              </div>
              <div>
                <div className="flex items-center gap-x-2">
                  <LuLayoutDashboard className={styles.icon} />
                  <h2 className="text-xl">Giá</h2>
                </div>
                <div {...form.register("price")}>
                  <PriceForm />
                  {form.formState.errors.price && (
                    <p className="text-red-500 ml-4">
                      {form.formState.errors.price.message}
                    </p>
                  )}
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
              Cập nhật
            </Button>
            <ToastContainer />
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateCourse;
