"use client";

import { useState } from "react";
import { FileUpload } from "@/components/ui/file-upload";
import { ImageIcon } from "lucide-react";

export const ImageForm = () => {
  const [imageUrl, setImageUrl] = useState("");

  const handleSubmit = (url:any) => {
    if (url) {
      setImageUrl(url);
      // Đây là nơi bạn có thể gọi hàm onSubmit hoặc làm bất kỳ điều gì bạn muốn với url
    }
  };
  return (
    <div className="mt-6 border bg-slate-100 rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        Hình ảnh khóa học
      </div>

      {/* <div className="flex items-center justify-center h-72 bg-slate-200 rounded-md"> */}
        {/* <ImageIcon className="h-10 w-10 text-slate-500" /> */}
        <FileUpload endpoint="courseImage" onChange={(url) => handleSubmit(url)}
        />
        {/* <FileUpload endpoint="courseImage" onChange={(url)=>{
          if(url){
            onsubmit({imageUrl:url});
          }
          }}
        /> */}
      </div>
    // </div>
  );
};
