"use client"
import React,{useEffect, useState} from 'react'
import { useRouter } from "next/navigation";
import {Droppable, DragDropContext,
    Draggable, DropResult
} from "@hello-pangea/dnd"
import {cn} from "@/lib/utils"
import {Grip, Pencil, Trash, X} from "lucide-react"
import { chapters } from '@prisma/client'
import Link from 'next/link'
import ConfirmDelete from "@/app/components/ConfirmDelete";
import { toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface ChaptersListProps{
    items: chapters[],
    onReorder: (updateData:{idChapter: number, orderChapter: number}[]) => void
}

const ChapterList = ({items,onReorder}:ChaptersListProps) => {
  const router = useRouter();
  const [isLoading, setLoading] = useState(false);
  const [isMounted,setIsMounted] = useState(false)
  const [chapters,setChapters] = useState(items)
  
  const notifyDelete:any = () => toast("Chương đã bị xóa",{
    icon: <Trash className='text-red-500'/>,
    position: "top-right",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  });
  const notifyErrorDel:any = () => toast("Đã có người học, không cho xóa!",{
    icon: <X className='text-red-500'/>,
    position: "top-right",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  });

  useEffect(() => {
    setIsMounted(true)
    setChapters(items);
  }, [items]);

  // thay đổi droppable
  const onDragEnd = (result: DropResult)=>{
    if(!result.destination) return;

    const items = Array.from(chapters)
    const [reorderItem] = items.splice(result.source.index, 1)
    items.splice(result.destination.index, 0, reorderItem)
    const startIndex = Math.min(result.source.index, result.destination.index)
    const endIndex = Math.max(result.source.index, result.destination.index)
    
    const updateChapters = items.slice(startIndex, endIndex + 1)
    setChapters(items)
    
    const updateData = updateChapters.map((chapter) => ({
        idChapter: chapter.idChapter,
        orderChapter: items.findIndex((item) => item.idChapter === chapter.idChapter)
    }))
    setChapters(items)
    onReorder(updateData)
  }
  
  if(!isMounted){
    return null
  }

  //xóa chapter
  const onDelete = async ({idChapter,idCourse}:any) =>{
    try{
      setLoading(true)
      const response = await fetch(`/api/chapter/${idChapter}`, {
        method: 'DELETE',
      });
      const data =await response.json()
      if(data.message === "Đã có người học, không cho xóa!"){
        notifyErrorDel();
        return;
      }
      if (response.ok) {
        notifyDelete()
      } else {
        toast.error("Lỗi, xin thử lại");
      }
    }catch{
      setLoading(false)
    }
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="chapters">
            {(provided)=>(
                <div {...provided.droppableProps} ref={provided.innerRef}>
                    {items.map((chapter,index)=>(
                        <Draggable key={chapter.idChapter}
                            draggableId={String(chapter.idChapter)}
                            index={index}
                        >
                            {(provided)=>(
                                <div className={cn("flex items-center gap-x-2 bg-slate-200 border-slate-200 border text-slate-700 rounded-md mb-4 text-sm",
                                    chapter.isPublished && "bg-sky-100 border-sky-200 text-sky-700"
                                )}
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                >
                                    <div className={cn(
                                        "px-2 py-3 border-r border-r-slate-200 hover:bg-slate-300 rounded-l-md transition",
                                        chapter.isPublished && "border-r-sky-200 hover:bg-sky-200"
                                    )}
                                    {...provided.dragHandleProps}
                                    >
                                        <Grip className='h-5 w-5'/>
                                    </div>
                                    {chapter.titleChapter}
                                    <div className='ml-auto flex items-center gap-x-2'>
                                        <div className={cn("bg-slate-400 hover:bg-slate-600 rounded-lg p-1 text-white", chapter.isPublished && "bg-green-400 hover:bg-green-500 ")}>
                                            {chapter.isPublished ?"Công khai" : "Không công khai"}
                                        </div>
                                        <Link href={`/teacher/chapter/updateChapter/${chapter.idChapter}`}>
                                            <Pencil className="h-4 w-4 hover:text-green-400 ml-2 cursor-pointer transition" />
                                        </Link>
                                        <ConfirmDelete onConfirmDel={() => onDelete({idChapter: chapter.idChapter})}>
                                        {/* <ConfirmDelete onConfirmDel={() => onDelete({idChapter: chapter.idChapter, idCourse: chapter.courseId})}> */}
                                          <button disabled={isLoading}>
                                            <Trash className="h-4 w-4 hover:text-red-500 ml-2" />
                                          </button>
                                        </ConfirmDelete>
                                    </div>
                                </div>
                            )}
                        </Draggable>
                    ))}                
                </div>
            )}
        </Droppable>
    </DragDropContext>
  )
}

export default ChapterList