"use client"
import React,{useEffect, useState} from 'react'
import { useRouter } from "next/navigation";
import {Droppable, DragDropContext,
    Draggable, DropResult
} from "@hello-pangea/dnd"
import {cn} from "@/lib/utils"
import {Grip, Pencil, Trash} from "lucide-react"
import { lessons } from '@prisma/client'
import Link from 'next/link'
import ConfirmDelete from "@/app/components/ConfirmDelete";
import { toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface LessonListProps{
    items: lessons[],
    onReorder: (updateData:{idLesson: number, orderLesson: number}[]) => void
}

const LessonList = ({items,onReorder}:LessonListProps) => {
  const router = useRouter();
  const [isLoading, setLoading] = useState(false);
  const [isMounted,setIsMounted] = useState(false)
  const [lessons,setLessons] = useState(items)
  
  const notifyDelete:any = () => toast("Chương đã bị xóa",{
    icon: <Trash className='text-red-500'/>,
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
        idLesson: lesson.idLessons,
        orderLesson: items.findIndex((item) => item.idLessons === lesson.idLessons)
    }))
    setLessons(items)
    onReorder(updateData)
  }
  
  if(!isMounted){
    return null
  }

  //xóa chapter
  const onDelete = async ({idLesson,idChapter}:any) =>{
    try{
      setLoading(true)
      const response = await fetch(`/api/chapter/${idLesson}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        notifyDelete()
      } else {
        toast.error("Lỗi, xin thử lại");
      }
      // const chaptersResponse = await fetch(`http://localhost:3000/api/courses/${idCourse}/chapter`,{
      //   method: "GET",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      // });
      // if (chaptersResponse.ok) {
      //   const updatedChaptersData = await chaptersResponse.json();
      //   setChapters(updatedChaptersData); 
      //   window.location.reload()
      // }
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
                                        <div className={cn("bg-slate-400 hover:bg-slate-600 rounded-lg p-1 text-white", lesson.isPublished && "bg-green-400 hover:bg-green-500 ")}>
                                            {lesson.isPublished ?"Công khai" : "Không công khai"}
                                        </div>
                                        <Link href={`/teacher/chapter/updateChapter/${lesson.idLessons}`}>
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