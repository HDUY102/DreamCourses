"use client";
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import Image from "next/image";
import logo from "@/app/img/logo.png";
import { useRouter } from "next/navigation";
import { PasswordInput } from "@/components/ui/password-input";
import Footer from "../components/Footer";
const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  password: z.string().min(3, {
    message: "Password must be at least 3 characters.",
  }),
});

const Login = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });
  const router = useRouter();

  const handleSubmit = async (event:any) => {
      event.preventDefault();
      const { username, password } = form.getValues();
      const formValue = { username, password }
      const res =await fetch("/api/login",{
        method: "POST",
        body: JSON.stringify({username, password})
      })
      if (res.ok) {
        const data = await res.json();        
        if (data.success) {
          sessionStorage.setItem("token", data.success);
          if (data.role === 1) {
            alert("Đăng nhập vào trang admin thành công")
            router.push("/adminn");
          } else if(data.role === 3){
            if(!data.isLocked){
              alert("Đăng nhập vào trang teacher thành công")
              router.push("/teacher");
            }else{
              alert("Tài khoản teacher đã bị khóa")
            }
          }else{
            alert("Đăng nhập vào trang student thành công")
            router.push("/");
          }
        } else {
          alert("Đăng nhập không thành công");
        }
      } else {
        alert("Đăng nhập không thành công");
      }
  };

  return (
    <div className="flex flex-col h-screen justify-between bg-gradient-to-br from-blue-400 via-purple-100 to-pink-200">
      <div>
        {/* Page Header BEGIN */}
        <header className="flex items-center justify-between bg-transparent h-16">
        {/* <header className="flex items-center justify-between bg-emerald-600 h-16"> */}
          <Link href={"/"}>
            <Image
              src={logo}
              width={76} height={15}
              className="p-2 ml-3 rounded-full"
              alt="LOGO"
            ></Image>
          </Link>
        </header>
        {/* Page Header END */}
      </div>
      <p className="text-center mt-20  text-emerald-800"><span className="text-green-800 italic text-3xl font-serif"> Dream</span> <span className="text-blue-900 text-3xl italic font-serif">Courses</span></p>
      {/* <p className="text-center mt-20 text-emerald-800"><b>DREAM COURSES</b></p> */}
      <p className="text-center mt-2 text-gray-500">Đăng nhập tài khoản Dream Courses <br></br>để kết nối với Dream Courses</p>
      <div className="flex justify-center">
        <div className="flex justify-center mt-8 rounded-lg p-4 bg-white bg-opacity-75 border-2 border-blue-400 border-solid relative">
        {/* <div className="flex justify-center mt-8 border border-y-2 border-x-2 w-[400px]"> */}
          <Form {...form}>
            <form onSubmit={handleSubmit} className="m-4">
              <FormDescription className="text-center">Đăng nhập tài khoản Dream Courses</FormDescription>
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Username"
                        {...field}
                        className="w-[90%]"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <PasswordInput {...field} placeholder="Password"/>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button className="mt-4 bg-emerald-500 w-72" type="submit">
                Đăng Nhập
              </Button>
            </form>
          </Form>
        </div>
      </div>
      <p className='mt-4 text-center'>
        Bạn chưa có tài khoản? <a className="hover:text-blue-600" href={'/register'}><u>Đăng Ký</u></a>
      </p>
      <Footer/>
    </div>
  )
};

export default Login;
