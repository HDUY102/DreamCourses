import React, { useEffect, useState } from 'react'
import { cn } from "@/lib/utils"
import { PlusCircle, Trash, Pencil } from "lucide-react"
import { questions } from '@prisma/client'
import Link from 'next/link'
import ConfirmDelete from "@/app/components/ConfirmDelete";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface QuestionProp {
    items: questions[],
}

const QuestionList = ({ items }: QuestionProp) => {
    const [isLoading, setLoading] = useState(false);
    const notifyDelete: any = () => toast("Quizz đã bị xóa", {
        icon: <Trash className='text-red-500' />,
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
    });

    // Xóa quizz
    const onDelete = async ({ idQuestion }: any) => {
        try {
            setLoading(true)
            const response = await fetch(`/api/question/${idQuestion}`, {
                method: 'DELETE',
            });
            if (response.ok) {
                notifyDelete()
            } else {
                toast.error("Lỗi, xin thử lại");
            }
        } catch {
            setLoading(false)
        }
    }

    return (
        <div>
            {items.map((question) => (
                <div key={question.idQuestion} className={cn("flex items-center gap-x-2 bg-slate-200 border-slate-200 border text-slate-700 rounded-md mb-4 text-sm",
                    "bg-sky-100 border-sky-200 text-sky-700"
                )}>
                    {question.content}
                    <div className='ml-auto flex items-center gap-x-2'>
                        <Link href={`/teacher/lesson/createQuizz/${question.idQuestion}`}>
                            <PlusCircle className="h-4 w-4 hover:text-sky-400 ml-2 cursor-pointer transition" />
                        </Link>
                        <Link href={`/teacher/lesson/updateLesson/${question.idQuestion}`}>
                            <Pencil className="h-4 w-4 hover:text-green-400 ml-2 cursor-pointer transition" />
                        </Link>
                        <ConfirmDelete onConfirmDel={() => onDelete({ idQuestion: question.idQuestion})}>
                            <button disabled={isLoading}>
                                <Trash className="h-4 w-4 hover:text-red-500 ml-2" />
                            </button>
                        </ConfirmDelete>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default QuestionList
