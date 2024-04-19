"use client"
import React,{useEffect, useState} from 'react'
import {chapters} from "@prisma/client"
import {Droppable, DragDropContext,
    Draggable, DropResult
} from "@hello-pangea/dnd"
import {cn} from "@/lib/utils"
import {Grip, Pencil} from "lucide-react"

interface ChapterListProps{
    items: chapters[],
    onReorder: (updateData:{id: string, orderChapter: number}[]) => void
    onEdit: (id:string) => void
}
const ChapterList = ({items,onReorder,onEdit}:ChapterListProps) => {
  const [isMounted,setIsMounted] = useState(false)
  const [chapters,setChapters] = useState(items)
  
  useEffect(()=>{
    setIsMounted(true)
  },[])

  useEffect(()=>{
    setChapters(items)
    // if (items && items.length > 0) {
    //     setChapters(items);
    // }
  },[items])

  const onDragEnd = (result: DropResult)=>{
    // if(!result.destination) return
    
    // const items = Array.from(chapters)
    // const [reorderItem] = items.splice(result.source.index,1)
    // items.splice(result.destination.index,0,reorderItem)
    
    // const startIndex = Math.min(result.source.index, result.destination.index)
    // const endIndex = Math.max(result.source.index, result.destination.index)
    // const updateChapters = items.slice(startIndex, endIndex+1)
    // setChapters(items)
    
    // const bulkUpdateData = updateChapters.map((chapter) => ({
    //     idChapter: String(chapter.idChapter),
    //     orderChapter: items.findIndex((item) => item.idChapter === chapter.idChapter)
    // }))

    // onReorder(bulkUpdateData)
  }

  if(!isMounted){
    return null
  }
  console.log("isMounted "+isMounted )
  console.log("Chapters:", chapters);
  chapters.forEach(chapters => {
    console.log("Title Chapter:", chapters);
});

  return (
    <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId='chapters'>
            {(provided)=>(
                <div {...provided.droppableProps} ref={provided.innerRef}>
                    {chapters.map((chapter,index)=>(
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
                                    {items.map(chapter => (
                                        <div>
                                            {chapter.titleChapter}
                                        </div>
                                    ))}
                                    {/* {String(chapter.titleChapter)} */}
                                    {/* <div>
                                        {chapters.forEach(chapters => {String(chapters)})}
                                        {`${index + 1}. ${chapter.titleChapter}`}
                                    </div> */}
                                    <div className='ml-auto pr-2 flex items-center gap-x-2'>
                                        <div className={cn("bg-slate-500", chapter.isPublished && "bg-sky-700")}>
                                            {chapter.isPublished?"Công khai" : "Không công khai"}
                                        </div>
                                        <Pencil onClick={()=> onEdit(String(chapter.idChapter))}
                                        className='w-4 h-4 cursor-pointer hover:opacity-75 transition'/>
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