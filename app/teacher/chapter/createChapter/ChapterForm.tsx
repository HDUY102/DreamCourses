"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Loader2, PlusCircle } from "lucide-react";
import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ChapterList from "./ChapterList";
import {chapters,courses} from "@prisma/client"

const chaptersSchema = z.object({
  titleChapter: z.string().min(1),
});

interface ChaptersFormProps{
  initialData: courses & {chapters: chapters[]}
}

export const ChapterForm = () => {
  const [isCreating, setIsCreating] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const toggleCreating = ()=> setIsCreating((current)=>!current)
  const router = useRouter()

  const notify: any = () =>toast.success("Thêm mới chapter thành công!", {
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
    resolver: zodResolver(chaptersSchema)
  });
  const { isSubmitting, isValid } = form.formState;

  const { id } = useParams();
  const idCourse = parseInt(id as string);
  const onSubmit = async (values: any) => {
    console.log(idCourse)
    // const isPublishValue = isPublished ? 1 : 0;
    const formValues = {
      titleChapter: values.titleChapter,
      // orderChapter: values.orderChapter,
      // description: values.description,
      isPublished: 0,
      courseId: idCourse
    };
    console.log(formValues);
    const respone = await fetch(`http://localhost:3000/api/courses/${idCourse}/chapter`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formValues),
    });

    if (respone.ok) {
      // toggleCreating()
      notify();
      // setTimeout(() => {
      //   window.location.reload();
      // }, 3000);
    } else {
      console.error("Error during Create:", respone.statusText);
    }
  };

  return (
    <div className="relative mt-6 border bg-slate-100 rounded-md p-4">
      {isUpdating && (
        <div className="absolute h-full w-full bg-slate-500/20 top-0 right-0 rounded-m flex items-center justify-center">
          <Loader2 className="animate-spin h-6 w-6 text-sky-700" />
        </div>
      )}
      <div className="font-medium flex items-center justify-between">
        Chương Khóa Học
      </div>
      <Form {...form}>
        <form className="space-y-4 mt-4" onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="titleChapter"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div {...form.register("titleChapter")}>
                  <Input
                    disabled={isSubmitting}
                    placeholder="Nhập tên chapter mới"
                    {...field}
                  />
                  </div>
                  
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* <ChapterList onEdit={()=>{}} onReorder={()=>{}} items={initialData.idChapter ||[]}/> */}
          <Button disabled={!isValid || isSubmitting} type="submit">
            Create
          </Button>
          <ToastContainer />
        </form>
      </Form>
    </div>
  );
};
