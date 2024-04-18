"use client"
import React,{useEffect, useState} from 'react'
import {chapters} from "@prisma/client"
import {Droppable, DragDropContext,
    Draggable, DropResult
} from "@hello-pangea/dnd"
import {cn} from "@/lib/utils"
import {Grip} from "lucide-react"

interface ChapterListProps{
    items: chapters[],
    onReorder: (updateData:{id: string, orderChapter: number}[]) => void
    onEdit: (id:string) => void
}
const ChapterList = ({items,onReorder,onEdit}:ChapterListProps) => {
  const [isMounted,setIsMounted] = useState(false)
  const [chapters,setchapters] = useState(items)
  useEffect(()=>{
    setIsMounted(true)
  },[])

  useEffect(()=>{
    setIsMounted(true)
  },[items])

  if(!isMounted){
    return null
  }

  return (
    <DragDropContext onDragEnd={()=>{}}>
        <Droppable droppableId='chapters'>
            {(provided)=>(
                <div {...provided.droppableProps} ref={provided.innerRef}>
                    {chapters.map((chapters,index)=>(
                        <Draggable key={chapters.idChapter}
                            draggableId={chapters.idChapter}
                            index={index}
                        >
                            {(provided)=>(
                                <div className={cn(
                                    "flex items-center gap-x-2 bg-slate-200",
                                    chapters.isPublished && "bg-sky-100 border-sky-200 text-sky-700"
                                )}
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                >
                                    <div className={cn(
                                        "px-2 py-3 border-r border-r-slate-200 hover: bg-slate-300 rounded-l=md transition",
                                        chapters.isPublished && "border-r-sky-200 hover:bg-sky-200"
                                    )}
                                    {...provided.dragHandleProps}
                                    >
                                        <Grip/>
                                    </div>
                                    {chapters.titleChapter}
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