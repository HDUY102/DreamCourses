"use client";
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import Sidebar from "@/app/adminn/sidebar/AdminSidebar";
import styles from "@/app/adminn/dashboard.module.css";

const RegisterSchema = z.object({
  username: z.string().min(3, {
    message: "Username must be at least 2 characters.",
  }),
  password: z.string().min(3, {
    message: "Password must be at least 3 characters.",
  }),
});
const AddAccountTeacher = () => {
  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      username: "",
      password: "", 
    },
  });
  const router = useRouter();

  const onSubmit = async (value: z.infer<typeof RegisterSchema>) => {
    const respone = await fetch("http://localhost:3000/api/teacher/addAccountTeacher", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: value.username,
        password: value.password,
      }),
    });
    if (respone.ok) {
      alert("Đăng ký thành công");
      router.push("/adminn/teacherManage");
    } else {
      console.error("Error during registration:", respone.statusText);
    }
  };
  return (
    <div>
      <div className="flex">
        <div className={styles.menu}>
          <Sidebar />
        </div>

        <div className={styles.contentmenu}>
          <p className="text-center mt-20 text-emerald-800">
            <b>DREAM LEARNING</b>
          </p>
          <p className="text-center mt-2 text-gray-500">
            Tạo tài khoản Dream Courses cho giảng viên <br></br>để kết nối với hệ thống
          </p>
          <div className="flex justify-center">
            <div className="m-8 border-[5px] shadow-lg rounded-xl w-[500px] h-70">
                <h1 className='text-center mb-2 mt-3'>ĐĂNG KÝ TÀI KHOẢN GIẢNG VIÊN</h1>
                <form className='max-w-xl m-3' onSubmit={form.handleSubmit(onSubmit)}>
                  <h5 className='mb-2'>Username</h5>
                  <input type="text" className='w-full p-2' placeholder="Username" {...form.register("username")}/>
                  <h5 className='mb-2'>Password</h5>
                  <input type="password" className='w-full p-2' placeholder="Password" {...form.register("password")}/>
                  <button className="mt-4 mb-4 p-2 bg-emerald-500 rounded-lg w-full hover:border-2 hover:bg-emerald-300 hover:text-primary" type="submit">ĐĂNG KÝ</button>
                </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddAccountTeacher;
