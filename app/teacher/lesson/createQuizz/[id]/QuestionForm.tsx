"use client";
import { useState,useEffect, Fragment } from "react";
import { Loader2, PlusCircle } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import QuestionList from "./QuestionList";
import { cn } from "@/lib/utils";
import { quizzs, questions } from "@prisma/client";
import QuestionPopup from "./QuestionPopup";

interface QuestionFormProps {
  initialData: quizzs & { questions: questions[] };
}

export const QuestionForm = ({ initialData }: QuestionFormProps) => {
  const [isCreating, setIsCreating] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [question, setQuestion] = useState<questions[]>(initialData?.questions || []);
  const toggleCreating = () => setIsCreating((current) => !current);
  const [showPopup, setShowPopup] = useState(false)

  const { id } = useParams();
  const idLesson = parseInt(id as string);
  const fetchQuestions = async () => {
    try {
      const response = await fetch(`/api/quizz/${idLesson}/question`);
      if (response.ok) {
        const data = await response.json();
        setQuestion(data);
        console.log("data ", data)
      }
    } catch (error) {
      console.error("Error fetching questions:", error);
    }
  };
  useEffect(() => {
      fetchQuestions();
  }, [idLesson]);

  const handleClick = () => {
    toggleCreating();
    setShowPopup(true);
  };
  
  return (
    <Fragment>
      <div className="relative mt-6 border bg-slate-100 rounded-md p-4">
        {isUpdating && (
          <div className="absolute h-full w-full bg-slate-500/20 top-0 right-0 rounded-m flex items-center justify-center">
            <Loader2 className="animate-spin h-6 w-6 text-sky-700" />
          </div>
        )}
        <div className="font-medium flex items-center justify-between">
          Danh sách câu hỏi
          <button className="flex justify-between hover:text-green-500" onClick={handleClick} type="button">
            <PlusCircle className="h-6 w-4 mr-1"/>Thêm câu hỏi
            {/* {isCreating ? (<>Hủy</>):(<><PlusCircle className="h-6 w-4 mr-1"/>Thêm câu hỏi</>)} */}
          </button>
        </div>
        {isCreating && (
          <QuestionPopup isVisible={showPopup} onClose={()=> setShowPopup(false)}/>
        )}
        {!isCreating  && (
          <div className={cn("text-sm mt-2", !initialData?.questions?.length && "text-slate-500 italic")}>
            {!question?.length && "Chưa có câu hỏi nào"}
            <QuestionList items={question || []}/>
          </div>
        )}
      </div>
    </Fragment>
  );
};
