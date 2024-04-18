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

const chaptersSchema = z.object({
  titleChapter: z.string().min(1),
});

export const ChaptersForm = () => {
  const [isCreating] = useState(false);
  const [isUpdating] = useState(false);
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
    // const isPublishValue = isPublished ? 1 : 0;
    const formValues = {
      titleChapter: values.titleChapter,
      orderChapter: values.orderChapter,
      // description: values.description,
      isPublished: 0,
      courseId: idCourse
    };
    console.log(formValues);
    const respone = await fetch(`http://localhost:3000/api/chapter/${idCourse}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formValues),
    });

    if (respone.ok) {
      notify();
      setTimeout(() => {
        window.location.reload();
      }, 3000);
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
        Course chapters
      </div>
      <Form {...form}>
        <form className="space-y-4 mt-4" onSubmit={form.handleSubmit(onSubmit)}>
          {/* <FormField
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
            )}
          /> */}
          {/* <ChapterList onEdit={()=>{}} onReorder={()=>{}} items={initialData.chapters||[]}/> */}
          <Button disabled={!isValid || isSubmitting} type="submit">
            Create
          </Button>
          <ToastContainer />
        </form>
      </Form>
      {!isCreating && (
        <div className={cn("text-sm mt-2 text-slate-500 italic")}></div>
      )}
      {!isCreating && (
        <p className="text-xs text-muted-foreground mt-4">
          Di chuyển chương để thay đổi thứ tự
        </p>
      )}
    </div>
  );
};
