"use client";

import { UploadDropzone } from "@/lib/uploadthing";
import { ourFileRouter } from "@/app/api/uploadthing/core";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";
import {FileText,X} from "lucide-react"
import { assignments } from '@prisma/client'

interface FileUploadProps {
  onChange: (url?: string) => void;
  endpoint: keyof typeof ourFileRouter;
}
export const AssignmentUpload = ({onChange, endpoint }: FileUploadProps) => {
  const [attachmentUrl, setAttachmentUrl] = useState<string>("");  
  return (
    <div>
      {attachmentUrl ? (
        <div className="flex">
          <a className="flex  items-center p-3 w-full bg-sky-100 border-sky-200 border text-sky-700 rounded-md" target="_blank" href={attachmentUrl}>
            <FileText className="h-4 w-4 mr-2 flex-shrink-0"/>
            <span>Xem Trước</span>
          </a>
          {/* <button type="button" className="ml-auto hover:opacity-60 transition" onClick={onDelete}>
            <X className="h-4 w-4 ml-2"/>
          </button> */}
        </div>
      ) : (
        <UploadDropzone
          endpoint={endpoint}
          onClientUploadComplete={(res) => {
            onChange(res?.[0].url);
            setAttachmentUrl(res[0].url);
          }}
          onUploadError={(error: Error) => {
            toast.error(`${error?.message}`);
          }}
        />
      )}
    </div>
  );
};
