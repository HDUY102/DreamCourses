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
import Sidebar from "@/app/teacher/sidebar/TeacherSidebar";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  price: z.coerce.number(),
});
const CourseManage = async () => {
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
    <div className="flex">
      <div className={styles.menu}>
        <Sidebar />
      </div>
      <div className={styles.contentmenu}>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="flex items-center justify-between">
              <div className="flex flex-row gap-y-2">
                <h1 className="text-2xl font-medium">Tạo Mới</h1>
                <Button className="text-xl ml-96 hover:bg-primary" variant="ghost">
                  Tạo
                </Button>
              </div>
            </div>
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
          </form>
        </Form>
      </div>
    </div>
  );
};

export default CourseManage;
