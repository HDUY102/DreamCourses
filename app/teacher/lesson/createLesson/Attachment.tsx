"use client";

import { useState } from "react";
import { FileUpload } from "@/components/ui/file-upload";
interface AttachmentFormProps {
    onAttachUpload: (url: string) => void;
}

export const AttachmentLesson = ({ onAttachUpload }: AttachmentFormProps) => {
    const [attachmentUrl, setAttachmentUrl] = useState("");

    const handleSubmit = (url: any) => {
      if (url) {
        setAttachmentUrl(url);
        onAttachUpload(url);
      }
    };
  return (
    <div className="mt-6 border bg-slate-100 rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        Tệp đính kèm
      </div>
      <FileUpload endpoint="courseAttachment" onChange={(url) => handleSubmit(url)}/>
      <div className="text-xs text-muted-foreground mt-4">
        Thêm tài liệu cho học viên luyện tập
      </div>
    </div>
  );
};
