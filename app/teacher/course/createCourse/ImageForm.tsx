"use client";

import { useState } from "react";
import { FileUpload } from "@/components/ui/file-upload";
interface ImageFormProps {
  onImageUpload: (url: string) => void;
}
export const ImageForm = ({ onImageUpload }: ImageFormProps) => {
  const [imageUrl, setImageUrl] = useState("");

  const handleSubmit = (url: any) => {
    if (url) {
      setImageUrl(url);
      onImageUpload(url);
    }
  };
  return (
    <div className="mt-6 border bg-slate-100 rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        Hình ảnh khóa học
      </div>
      <FileUpload endpoint="courseImage" onChange={(url) => handleSubmit(url)}/>
    </div>
  );
};
