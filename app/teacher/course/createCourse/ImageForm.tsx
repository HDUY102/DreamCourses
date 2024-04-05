"use client";

import * as z from "zod";
import { Pencil, PlusCircle, ImageIcon } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

import { Button } from "@/components/ui/button";
// import { FileUpload } from "@/components/ui/file-upload";

const formSchema = z.object({
  imageUrl: z.string().min(1, {
    message: "Image is required",
  }),
});

export const ImageForm = () => {
  return (
    <div className="mt-6 border bg-slate-100 rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        Course image
      </div>

      <div className="flex items-center justify-center h-60 bg-slate-200 rounded-md">
        <ImageIcon className="h-10 w-10 text-slate-500" />
      </div>
    </div>
  );
};
