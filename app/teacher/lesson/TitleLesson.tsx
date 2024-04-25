"use client";
import React from "react";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";

const titleSchema = z.object({
  titleLessons: z.string(),
});
export const TitleLessons = () => {
  const form = useForm<z.infer<typeof titleSchema>>({
    resolver: zodResolver(titleSchema),
  });
  const { isSubmitting } = form.formState;
  return (
    <div className="mt-6 border bg-slate-100 rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        Tiêu Đề
      </div>
      <Form {...form}>
        <form className="space-y-4 mt-4">
          <FormField
            control={form.control}
            name="titleLessons"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    disabled={isSubmitting}
                    placeholder="Nhập tiêu đề"
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

export default TitleLessons;
