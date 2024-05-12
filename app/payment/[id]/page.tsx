"use client";
import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import Image from "next/image";

const QuestionSchema = z.object({
  username: z.string().min(1),
  answer: z.string().min(1),
});

const PurchasetPage = () => {
  const router = useRouter();
  const [cardNumber, setCardNumber] = useState("");
  const [expiration, setExpiration] = useState("");
  const [cvv, setCvv] = useState("");
  const [name, setName] = useState("");
  const [course, setCourse] = useState("")
  const [userName, setUserName] = useState("")

  const form = useForm<z.infer<typeof QuestionSchema>>({
    resolver: zodResolver(QuestionSchema),
  });
  const { isSubmitting, isValid } = form.formState;
  const token = sessionStorage.getItem("token");
  if (!token) {
    router.push("/login");
  }
  const callBack = () => {
    router.back();
  };
  const {id} = useParams()
  const idCourse = parseInt(id as string)
  useEffect(()=>{
    const fetchPurchase = async () =>{
        const response = await fetch(`/api/checkout/${idCourse}`, {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
        });
        if(response.ok){
            const data = await response.json()
            setCourse(data.course)
            setUserName(data.getUser.username)
        }
    }
    fetchPurchase()
  })
  const handlePurchaset = () => {
    // Thực hiện xử lý thanh toán ở đây, gửi thông tin thẻ và hóa đơn lên máy chủ
  };
  return (
    <div id="wrapper" className="flex justify-center items-center fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm">
      <div className="w-[600px] flex flex-col">
        <button className="text-white text-xl place-self-end" onClick={callBack}>
          X
        </button>
        <div className="bg-white p-2 rounded">
          <div className="flex justify-center">
          <Image
            width={250}
            height={70}
            src={course?.image}
            alt="Hình"
            className=" object-cover rounded-sm mb-3"
          />
          </div>
          <label className="mb-2">
            <span className="flex justify-center text-base">{course?.titleCourse}</span>
          </label>
          <Form {...form}>
            <form className="space-y-4 mt-4">
              Tên người thanh toán
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input className="mb-5"
                        disabled={isSubmitting}
                        placeholder="Mời nhập tên ..."
                        {...field}
                        value={userName}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              Số điện thoại
              <FormField
                control={form.control}
                name="answer"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input className="mb-5"
                        disabled={isSubmitting}
                        placeholder="0123456789..."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              Quốc gia
              <FormField
                control={form.control}
                name="answer"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input className="mb-5"
                        disabled={isSubmitting}
                        placeholder="Quốc gia ..."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button disabled={!isValid || isSubmitting} type="submit" className="w-full">
                Thanh Toán: {course?.price}₫
              </Button>
              <ToastContainer />
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default PurchasetPage;
