"use client";

import { UploadDropzone } from "@/lib/uploadthing";
import { ourFileRouter } from "@/app/api/uploadthing/core";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";
import {Video} from "lucide-react"

interface VideoUploadProps {
  onChange: (url?: string) => void;
  endpoint: keyof typeof ourFileRouter;
}
export const VideoUpload = ({onChange, endpoint }: VideoUploadProps) => {
  const [videoUrl, setVideoUrl] = useState<string>("");  
  return (
    <div>
      {videoUrl ? (
        <div className="flex">
          <a className="flex  items-center p-3 w-full bg-sky-100 border-sky-200 border text-sky-700 rounded-md" target="_blank" href={videoUrl}>
            <Video className="h-4 w-4 mr-2 flex-shrink-0"/>
          </a>
        </div>
      ) : (
        <UploadDropzone
          endpoint={endpoint}
          onClientUploadComplete={(res) => {
            onChange(res?.[0].url);
            setVideoUrl(res[0].url);
          }}
          onUploadError={(error: Error) => {
            toast.error(`${error?.message}`);
          }}
        />
      )}
    </div>
  );
};
