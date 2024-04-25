"use client";

import { useState,useEffect } from "react";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Loader2, PlusCircle } from "lucide-react";
import { LuMoveVertical  } from "react-icons/lu";
import { useParams, useRouter } from "next/navigation";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import LessonList from "./LessonList";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { chapters, lessons } from "@prisma/client";

const LessonSchema = z.object({
  titleLessons: z.string().min(1),
});

interface LessonFormProps {
  initialData: chapters & { lessons: lessons[] };
}

export const LessonForm = ({ initialData }: LessonFormProps) => {
  const [isCreating, setIsCreating] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [lessons, setLessons] = useState<lessons[]>(initialData?.lessons || []);
  const toggleCreating = () => setIsCreating((current) => !current);
  const router = useRouter();

  const notify: any = () =>
    toast.success("Thêm mới bài học thành công!", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
  });
  const notifyReOrder: any = () =>
    toast("Thứ tự bài đã thay đổi!", {
      icon: <LuMoveVertical className="text-green-500"/>,
      position: "top-right",
      autoClose: 2500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
  });

  const form = useForm<z.infer<typeof LessonSchema>>({
    resolver: zodResolver(LessonSchema)
  });
  const { isSubmitting, isValid } = form.formState;
  const { id } = useParams();
  const idChapter = parseInt(id as string);
  const fetchLessons = async () => {
    try {
      const response = await fetch(`/api/chapter/${idChapter}/lesson`);
      if (response.ok) {
        const data = await response.json();
        setLessons(data);
      }
    } catch (error) {
      console.error("Error fetching lessons:", error);
    }
  };
  useEffect(() => {
      fetchLessons();
  }, [idChapter]);

  const onSubmit = async (values: any) => {
    const formValues = {
      titleLessons: values.titleLessons,
      isPublished: false,
      chapterId: idChapter,
    };
    const respone = await fetch( `http://localhost:3000/api/chapter/${idChapter}/lesson`,{
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formValues),
      }
    );
    fetchLessons();
    if (respone.ok) {
      notify();
      setTimeout(() => {
        toggleCreating();
      }, 2000);
    } else {
      console.error("Error during Create:", respone.statusText);
    }
  }

  const onReorder = async (updateData: {idLessons: number, orderLesson: number}[]) =>{
    try {
      setIsUpdating(true)
      const response = await fetch(`http://localhost:3000/api/chapter/${idChapter}/lesson`,{
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updateData) 
      });
      if (response.ok) {
        fetchLessons();
        notifyReOrder();
        setIsUpdating(false);
        setTimeout(() => {
          router.refresh();
        }, 3000);
      }
    } catch (error) {
      console.error("Lỗi reOrderChapter:", error);
    }
  }

  return (
    <div className="relative mt-6 border bg-slate-100 rounded-md p-4">
      {isUpdating && (
        <div className="absolute h-full w-full bg-slate-500/20 top-0 right-0 rounded-m flex items-center justify-center">
          <Loader2 className="animate-spin h-6 w-6 text-sky-700" />
        </div>
      )}
      <div className="font-medium flex items-center justify-between">
        Danh sách bài học
        <button className="flex justify-between hover:text-green-500" onClick={toggleCreating} type="button">
          {isCreating ? (<>Hủy</>):(<><PlusCircle className="h-6 w-4 mr-1"/>Thêm chương</>)}
        </button>
      </div>
      {isCreating && (
        <Form {...form}>
        <form className="space-y-4 mt-4" onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="titleLessons"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    disabled={isSubmitting}
                    placeholder="Nhập tên lessson mới"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
          )}/>
          <Button disabled={!isValid || isSubmitting} type="button" onClick={form.handleSubmit(onSubmit)}>
            Lưu
          </Button>
          <ToastContainer />
        </form>
      </Form>
      )}
      {!isCreating  && (
        <div className={cn("text-sm mt-2", !initialData?.lessons?.length && "text-slate-500 italic")}>
          {!lessons?.length && "Chưa có bài học"}
          <LessonList onReorder={onReorder} items={lessons || []}/>
        </div>
      )}

      {!isCreating &&(
        <p className="text-xs text-muted-foreground mt-2">
          Kéo thả để thay đổi thứ tự bài học
        </p>
      )}
    </div>
  );
};
