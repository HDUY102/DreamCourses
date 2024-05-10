"use client";
import React,{ useState,useEffect } from "react";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Button } from "@/components/ui/button";
import { Pencil} from "lucide-react";
import { useParams } from "next/navigation";
import { quizzs, lessons } from "@prisma/client";

const titleSchema = z.object({
  nameQuizz: z.string().min(1, { message: "Tên Quizz không được bỏ trống" }),
  description: z.string().min(1, { message: "Mô tả không được bỏ trống" })
});

interface QuizzFormProps {initialData: lessons & { quizz: quizzs}}

export const QuizzForm = ({initialData}:QuizzFormProps) => {
  const notify: any = () =>
    toast.success("Thêm mới quizz thành công!", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
  });
  const notifyUpdate: any = () =>
    toast.success("Cập nhật quizz thành công!", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
  });
  const form = useForm<z.infer<typeof titleSchema>>({
    resolver: zodResolver(titleSchema),
  });
  const { isSubmitting, isValid  } = form.formState;
  const [isUpdating, setIsUpdating] = useState(false);
  const toggleUpdating = () => setIsUpdating((current) => !current);
  const {id} = useParams()
  const idLesson = parseInt(id as string)
  const [quizz, setQuizz] = useState<quizzs>(initialData?.quizz || "");

  const fetchQuizz = async () => {
    try {
      const response = await fetch(`/api/lesson/${idLesson}/quizz`);
      if (response.ok) {
        const data = await response.json();
        setQuizz(data);
      }
    } catch (error) {
      console.error("Error fetching questions:", error);
    }
  };
  useEffect(() => {
    fetchQuizz();
  }, [idLesson]);
  
  // Tạo mới quizz
  const onSubmit = async (values: any) => {
    const formValues = {
      nameQuizz: values.nameQuizz,
      description: values.description,
      idLessons: idLesson
    };
    const respone = await fetch( `/api/lesson/${idLesson}/quizz`,{
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formValues),
      }
    );
    fetchQuizz();
    if (respone.ok) {
      notify();
      setTimeout(() => {
        toggleUpdating();
      }, 3000);
    } else {
      console.error("Error during Create:", respone.statusText);
    }
  }
  
  // Cập nhật quizz
  const onUpdate = async (values: any) => {
    const formValues = {
      nameQuizz: values.nameQuizz,
      description: values.description,
      idLessons: idLesson
    };
    const respone = await fetch( `/api/lesson/${idLesson}/quizz`,{
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formValues),
      }
    );
    fetchQuizz();
    if (respone.ok) {
      notifyUpdate();
      setTimeout(() => {
        toggleUpdating();
      }, 3000);
    } else {
      console.error("Error during Create:", respone.statusText);
    }
  }
  const submitHandler = quizz ? onUpdate : onSubmit;

  return (
    <div className="mt-6 border bg-slate-100 rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        Nội dung Quizz
        <button className="flex justify-between hover:text-green-500" onClick={toggleUpdating} type="button">
          {isUpdating ? (<>Hủy</>) : (<><Pencil className="h-6 w-4 mr-1" />Chỉnh sửa</>)}
        </button>
      </div>
      {isUpdating && (
        <Form {...form}>
        <form className="space-y-4 mt-4" onSubmit={form.handleSubmit(submitHandler)}>
          <FormField
            control={form.control}
            name="nameQuizz"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    disabled={isSubmitting}
                    placeholder="Nhập tên quizz"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
          )}/>
        </form>
      </Form>
      )}
      {isUpdating && (
        <Form {...form}>
        <form className="space-y-4 mt-4" onSubmit={form.handleSubmit(submitHandler)}>
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Textarea
                    disabled={isSubmitting}
                    placeholder="Nhập mô tả cho quizz"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
          )}/>
          <Button disabled={!isValid || isSubmitting} type="button" onClick={form.handleSubmit(submitHandler)}>
            Lưu
          </Button>
          <ToastContainer />
        </form>
      </Form>
      )}
      {!isUpdating &&  (
        <div className="text-sm mt-2 italic text-slate-500">{quizz?.nameQuizz || "Chưa có quizz nào"}</div>
      )}
    </div>
  );
};

export default QuizzForm;
