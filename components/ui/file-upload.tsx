"use client";

import { UploadDropzone } from "@/lib/uploadthing";
import { ourFileRouter } from "@/app/api/uploadthing/core";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";
import Image from "next/image";

interface FileUploadProps {
  onChange: (url?: string) => void;
  endpoint: keyof typeof ourFileRouter;
}
export const FileUpload = ({ onChange, endpoint }: FileUploadProps) => {
  const [imgUrl, setImgUrl] = useState<string>("");
  return (
    <div className="">
      {imgUrl.length?(<div>
          <Image src={imgUrl} alt="image course" width={525} height={0} />
        </div>):(<UploadDropzone
        endpoint={endpoint}
        onClientUploadComplete={(res) => {
          onChange(res?.[0].url);
          setImgUrl(res[0].url)
        }}
        onUploadError={(error: Error) => {
          toast.error(`${error?.message}`);
        }}
      />)}
    </div>
  );
};
