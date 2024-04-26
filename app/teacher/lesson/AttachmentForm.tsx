"use client";
import { useState } from "react";
import { AssignmentUpload } from "@/components/ui/assignment-upload";
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
    <div className="mt-2 border bg-slate-100 rounded-md p-4">
      <AssignmentUpload endpoint="courseAttachment" onChange={(url) => handleSubmit(url)}/>
      <div className="text-xs text-muted-foreground mt-4">
        Thêm tài liệu cho học viên luyện tập
      </div>
    </div>
  );
};
