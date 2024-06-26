"use client";
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import Sidebar from "@/app/adminn/sidebar/AdminSidebar";
import styles from "@/app/adminn/dashboard.module.css";
import { ToastContainer,toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const RegisterSchema = z.object({
  username: z.string().min(3, {
    message: "Username must be at least 2 characters.",
  }),
  password: z.string().min(3, {
    message: "Password must be at least 3 characters.",
  }),
});
const AddAccountTeacher = () => {
  const router = useRouter();
  const token = sessionStorage.getItem("token")
  const notify: any = () =>
    toast.success("Tài khoản giảng viên đã được tạo!", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
  });
  if (!token) {
    router.push('/login')
  }
  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      username: "",
      password: "", 
    },
  });

  const onSubmit = async (value: z.infer<typeof RegisterSchema>) => {
    const respone = await fetch("http://localhost:3000/api/admin/teacher", {
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
      notify()
      setTimeout(()=>{
        router.push("/adminn/teacherManage");
      },2500)
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
            <b>DREAM COURSES</b>
          </p>
          <p className="text-center mt-2 text-gray-500">
            Tạo tài khoản Dream Courses cho giảng viên <br></br>để kết nối với hệ thống
          </p>
          <div className="flex justify-center">
            <div className="m-8 border-[5px] shadow-lg rounded-xl w-[500px] h-70">
                <h1 className='text-center mb-2 mt-3'>TẠO TÀI KHOẢN GIẢNG VIÊN</h1>
                <form className='max-w-xl m-3' onSubmit={form.handleSubmit(onSubmit)}>
                  <h5 className='mb-2'>Username</h5>
                  <input type="text" className='w-full p-2' placeholder="Username" {...form.register("username")}/>
                  <h5 className='mb-2'>Password</h5>
                  <input type="password" className='w-full p-2' placeholder="Password" {...form.register("password")}/>
                  <button className="mt-4 mb-4 p-2 bg-emerald-500 rounded-lg w-full hover:bg-emerald-400 hover:text-primary" type="submit">TẠO TÀI KHOẢN</button>
                  <ToastContainer />
                </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddAccountTeacher;
