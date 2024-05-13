import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { PlusCircle, Trash, Pencil } from "lucide-react";
import { questions } from "@prisma/client";
import ConfirmDelete from "@/app/components/ConfirmDelete";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import QuestionPopup from "./QuestionPopup";

interface QuestionProp {
  initialData: questions[];
}

const QuestionList = ({ initialData }: QuestionProp) => {
  const [isLoading, setLoading] = useState(false);
  const [showPopup, setShowPopup] = useState(false)
  const [selectedQuestion, setSelectedQuestion] = useState<questions | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const notifyDelete: any = () =>
    toast("Question đã bị xóa", {
      icon: <Trash className="text-red-500" />,
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  const notifyUpdate: any = () =>
    toast("Đã cập nhật question", {
      icon: <Pencil className="text-green-500" />,
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });

  // Xóa question
  const onDelete = async ({ idQuestion }: any) => {
    try {
      setLoading(true);
      const response = await fetch(`/api/question/${idQuestion}`, {
        method: "DELETE",
      });
      if (response.ok) {
        notifyDelete();
        setIsSuccess(true);
      } else {
        toast.error("Lỗi, xin thử lại");
      }
    } catch {
      setLoading(false);
    }
  };
  //update question
  const onUpdate = async ({ idQuestion }: any) => {
    try {
      setLoading(true);
      const response = await fetch(`/api/question/${idQuestion}`, {
        method: "PUT",
      });
      if (response.ok) {
        notifyUpdate();
      } else {
        toast.error("Lỗi, xin thử lại");
      }
    } catch {
      setLoading(false);
    }
  };
  console.log("initialData:", initialData);
  return (
    <div>
      {initialData.map((question) => (
        <div
          key={question.idQuestion}
          className={cn(
            "p-2 flex items-center gap-x-2 bg-slate-200 border-slate-200 border text-slate-700 rounded-md mb-4 text-sm",
            "bg-sky-100 border-sky-200 text-sky-700"
          )}
        >
          {question.content}
          <div className="ml-auto flex items-center gap-x-2">
            <Pencil onClick={() => { setSelectedQuestion(question);setShowPopup(true);}} 
              className="h-4 w-4 hover:text-green-400 ml-2 cursor-pointer transition"/>
            <QuestionPopup isVisible={showPopup} onClose={() => setShowPopup(false)} selectedQuestion={selectedQuestion} />
            <ConfirmDelete onConfirmDel={() => onDelete({ idQuestion: question.idQuestion })}>
              <button disabled={isLoading}>
                <Trash className="h-4 w-4 hover:text-red-500 ml-2" />
              </button>
            </ConfirmDelete>
          </div>
        </div>
      ))}
    </div>
  );
};

export default QuestionList;
