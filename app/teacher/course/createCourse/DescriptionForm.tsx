"use client";
import React,{ useState,useEffect } from "react";
import * as z from "zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { cn } from "@/lib/utils";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import 'react-datepicker/dist/react-datepicker.css';
import { Editor } from "@/components/ui/editor";

const introduceSchema = z.object({
  introduce: z.string(),
});
const DescriptionForm = () => {
  const form = useForm<z.infer<typeof introduceSchema>>({
    resolver: zodResolver(introduceSchema),
  });
  const { control, formState: { errors }  } = useForm<z.infer<typeof introduceSchema>>({
    resolver: zodResolver(introduceSchema),
  })
  const { isSubmitting } = form.formState;
  return (
    <div className="mt-6 border bg-slate-100 rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        Giới thiệu khóa học
      </div>

      <Form {...form}>
        <form className="space-y-4 mt-4">
          <FormField
            control={form.control}
            name="introduce"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  {/* <Editor
                    {...field}
                    // className="ml-3 mb-3"  theme="snow" value={Content} onChange={(value) => {
                    //   setContent(value); // Cập nhật giá trị của ReactQuill
                    //   field.onChange(value); // Cập nhật giá trị của React Hook Form
                    // }} 
                    // value={Content}
                    // onChange={setContent}
                  /> */}
                  <Textarea
                    disabled={isSubmitting}
                    placeholder="Nhập mô tả"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
    </div>
  );
};

export default DescriptionForm;
