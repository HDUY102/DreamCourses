"use client"
import React,{useEffect, useState} from 'react'
import { useRouter } from "next/navigation";
import {Droppable, DragDropContext,
    Draggable, DropResult
} from "@hello-pangea/dnd"
import {cn} from "@/lib/utils"
import {Grip, Pencil, Trash, X} from "lucide-react"
import { lessons } from '@prisma/client'
import Link from 'next/link'
import ConfirmDelete from "@/app/components/ConfirmDelete";
import { toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaQuestionCircle } from 'react-icons/fa';

interface LessonListProps{
    items: lessons[],
    onReorder: (updateData:{idLessons: number, orderLesson: number}[]) => void
}

const LessonList = ({items,onReorder}:LessonListProps) => {
  const router = useRouter();
  const [isLoading, setLoading] = useState(false);
  const [isMounted,setIsMounted] = useState(false)
  const [lessons,setLessons] = useState(items)
  
  const notifyErrorDel:any = () => toast("Đã có người học, không cho xóa!",{
    icon: <X className='text-red-500'/>,
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  });

  useEffect(() => {
    setIsMounted(true)
    setLessons(items);
  }, [items]);

  // thay đổi droppable
  const onDragEnd = (result: DropResult)=>{
    if(!result.destination) return;

    const items = Array.from(lessons)
    const [reorderItem] = items.splice(result.source.index, 1)
    items.splice(result.destination.index, 0, reorderItem)
    const startIndex = Math.min(result.source.index, result.destination.index)
    const endIndex = Math.max(result.source.index, result.destination.index)
    
    const updateLessons = items.slice(startIndex, endIndex + 1)
    setLessons(items)
    
    const updateData = updateLessons.map((lesson) => ({
        idLessons: lesson.idLessons,
        orderLesson: items.findIndex((item) => item.idLessons === lesson.idLessons)
    }))
    setLessons(items)
    onReorder(updateData)
  }
  
  if(!isMounted){
    return null
  }

  //xóa lesson
  const onDelete = async ({idLesson,idChapter}:any) =>{
    try{
      setLoading(true)
      const response = await fetch(`/api/lesson/${idLesson}`, {
        method: 'DELETE',
      });
      const data =await response.json()
      if(data.message === "Đã có người học, không cho xóa!"){
        notifyErrorDel();
        return;
      }else {
        toast.error("Lỗi, xin thử lại");
      }
    }catch{
      setLoading(false)
    }
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="lessons">
            {(provided)=>(
                <div {...provided.droppableProps} ref={provided.innerRef}>
                    {items.map((lesson,index)=>(
                        <Draggable key={lesson.idLessons}
                            draggableId={String(lesson.idLessons)}
                            index={index}
                        >
                            {(provided)=>(
                                <div className={cn("flex items-center gap-x-2 bg-slate-200 border-slate-200 border text-slate-700 rounded-md mb-4 text-sm",
                                    lesson.isPublished && "bg-sky-100 border-sky-200 text-sky-700"
                                )}
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                >
                                    <div className={cn(
                                        "px-2 py-3 border-r border-r-slate-200 hover:bg-slate-300 rounded-l-md transition",
                                        lesson.isPublished && "border-r-sky-200 hover:bg-sky-200"
                                    )}
                                    {...provided.dragHandleProps}
                                    >
                                        <Grip className='h-5 w-5'/>
                                    </div>
                                    {lesson.titleLessons}
                                    <div className='ml-auto flex items-center gap-x-2'>
                                        <div className={cn("bg-black rounded-lg p-1 text-white", lesson.isPublished && "bg-green-400 hover:bg-green-500 ")}>
                                            {lesson.isPublished ?"Công khai" : "Không công khai"}
                                        </div>
                                        <Link href={`/teacher/lesson/createQuizz/${lesson.idLessons}`}>
                                            <FaQuestionCircle className="h-4 w-4 hover:text-sky-400 ml-2 cursor-pointer transition" />
                                        </Link>
                                        <Link href={`/teacher/lesson/updateLesson/${lesson.idLessons}`}>
                                            <Pencil className="h-4 w-4 hover:text-green-400 ml-2 cursor-pointer transition" />
                                        </Link>
                                        <ConfirmDelete onConfirmDel={() => onDelete({idLesson: lesson.idLessons, idChapter: lesson.chapterId})}>
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

export default LessonList