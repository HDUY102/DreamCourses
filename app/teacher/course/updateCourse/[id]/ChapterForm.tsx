"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Loader2, PlusCircle,Pencil } from "lucide-react";
import { useState,useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import ChapterList from "./ChapterList";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { chapters, courses } from "@prisma/client";

const chaptersSchema = z.object({
  titleChapter: z.string().min(1),
});

interface ChapterFormProps {
  initialData: courses & { chapters: chapters[] };
}

export const ChapterForm = ({ initialData }: ChapterFormProps) => {
  const [isCreating, setIsCreating] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [chapters, setChapters] = useState<chapters[]>(initialData?.chapters || []);
  const toggleCreating = () => setIsCreating((current) => !current);
  const router = useRouter();

  const notify: any = () =>
    toast.success("Thêm mới chapter thành công!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });

  const form = useForm<z.infer<typeof chaptersSchema>>({
    resolver: zodResolver(chaptersSchema),
    defaultValues:{
      titleChapter: ""
    }
  });
  const { isSubmitting, isValid } = form.formState;
  const { id } = useParams();
  const idCourse = parseInt(id as string);
  useEffect(() => {
      const fetchChapters = async () => {
        try {
          const response = await fetch(`http://localhost:3000/api/courses/${idCourse}/chapter`);
          if (response.ok) {
            const data = await response.json();
            setChapters(data);
          }
        } catch (error) {
          console.error("Error fetching chapters:", error);
        }
      };
      fetchChapters();
  }, [idCourse]);

  const onSubmit = async (values: any) => {
    // const isPublishValue = isPublished ? 1 : 0;
    const formValues = {
      titleChapter: values.titleChapter,
      // description: values.description,
      isPublished: false,
      courseId: idCourse,
    };
    const respone = await fetch(
      `http://localhost:3000/api/courses/${idCourse}/chapter`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formValues),
      }
    );
    const chaptersResponse = await fetch(`http://localhost:3000/api/courses/${idCourse}/chapter`,{
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (chaptersResponse.ok) {
      const updatedChaptersData = await chaptersResponse.json();
      setChapters(updatedChaptersData); 
    }
    if (respone.ok) {
      notify();
      setTimeout(() => {
        toggleCreating();
      }, 2000);
      setTimeout(() => {
        router.refresh();
      }, 3000);
    } else {
      console.error("Error during Create:", respone.statusText);
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
        Chương Khóa Học
        <Button onClick={toggleCreating} type="button" variant="ghost">
          {isCreating ? (<>Cancel</>):(<><PlusCircle className="h-4 w-4 mr-2"/>Thêm chương</>)}
        </Button>
      </div>
      {isCreating && (
        <Form {...form}>
        <form className="space-y-4 mt-4" onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="titleChapter"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    disabled={isSubmitting}
                    placeholder="Nhập tên chapter mới"
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
        <div className={cn("text-sm mt-2", !initialData?.chapters?.length && "text-slate-500 italic")}>
          {!chapters?.length && "Chưa có chương nào"}
          <ChapterList onEdit={() => {}} onReorder={() => {}} items={chapters || []}/>
        </div>
      )}

      {!isCreating &&(
        <p className="text-xs text-muted-foreground mt-2">
          Kéo thả để thay đổi thứ tự chương
        </p>
      )}
    </div>
  );
};
