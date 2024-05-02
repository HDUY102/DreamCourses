"use client";

import MuxPlayer from "@mux/mux-player-react"; 
import NextVideo from 'next-video';
import { Pencil, PlusCircle,Video} from "lucide-react";
import { useState } from "react";
import {  useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { lessons, videolesson } from "@prisma/client";
import { VideoUpload } from "@/components/ui/video-upload";
interface VideoProps{
  initialData: lessons & {muxData?: videolesson | null};
  onVideoUpload: (url: string) => void;
}
export const VideoLesson = ({initialData,onVideoUpload}:VideoProps) => {
  const [isEditing, setIsEditing] = useState(false)
  const [videoUrl, setVideoUrl] = useState("");
  const router = useRouter()
  const  toggleEdit = () => setIsEditing((current) => !current)
  const notify: any = () =>toast.success("Tải lên video bài học thành công!", {
    position: "top-right",
    autoClose: 2500,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
});
  const handleSubmit = (url: any) => {
    if (url) {
      setVideoUrl(url);
      onVideoUpload(url);
    }
  };

  return (
    <div className="mt-6 border bg-slate-100 rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        Video Bài Học
        <button type="button" onClick={toggleEdit} className="flex">
          {isEditing && (<>Cancel</>)}
          {!isEditing && !initialData?.videoUrl && (
            <><PlusCircle className="h-6 w-4 mr-1 mb-2"/> Thêm Video</>
          )}
          {!isEditing && initialData?.videoUrl && (
            <><Pencil className="h-4 w-4 mr-2" />Sửa đổi</>
          )}
        </button>
      </div>
      {!isEditing && (
        !initialData?.videoUrl ? (
          <div className="flex items-center justify-center h-60 bg-slate-200 rounded-md">
            <Video className="h-10 w-10 text-slate-500" />
          </div>
        ):(<div className="relative aspect-video mt-2">
            {/* <MuxPlayer 
            style={{ height: '100%', maxWidth: '100%' }}
            streamType="on-demand"
            playbackId={initialData?.muxData?.idPlayback || ""}/> */}
            <NextVideo src={videoUrl}/>
          </div>
      ))}
      {isEditing && (
        <div>
          <VideoUpload endpoint="chapterVideo" onChange={(url) => handleSubmit(url)}/>
          <div className="text-xs text-muted-foreground mt-4">Tải lên video tại đây</div>
        </div>
      )}
      {initialData?.videoUrl && !isEditing && (
        <div className="text-xs text-muted-foreground mt-2">
          Việc tải video có thể mất vài phút. Vui lòng refresh trang nếu video không xuất hiện
        </div>
      )}
      <ToastContainer />
    </div>
  );
};
