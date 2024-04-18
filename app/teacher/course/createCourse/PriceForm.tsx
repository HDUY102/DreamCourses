"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";

const formSchema = z.object({
  price: z.coerce.number(),
});

export const PriceForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const { isSubmitting } = form.formState;

  return (
    <div className="mt-6 border bg-slate-100 rounded-md p-4">
      <div className="font-medium flex items-center justify-between"> Giá khóa học </div>
      <p className={cn("text-sm mt-2 text-slate-500 italic")}></p>
      <Form {...form}>
        <form className="space-y-4 mt-4">
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    type="number"
                    step="1000"
                    min="0"
                    disabled={isSubmitting}
                    placeholder="Nhập giá cho khóa học của bạn"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex items-center gap-x-2"></div>
        </form>
      </Form>
    </div>
  );
};
