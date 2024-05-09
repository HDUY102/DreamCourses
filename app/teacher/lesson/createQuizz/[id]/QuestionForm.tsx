"use client";
import { useState,useEffect } from "react";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Loader2, PlusCircle } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import QuestionList from "./QuestionList";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { quizzs, questions } from "@prisma/client";

const QuestionSchema = z.object({
  content: z.string().min(1),
});

interface QuestionFormProps {
  initialData: quizzs & { questions: questions[] };
}

export const QuestionForm = ({ initialData }: QuestionFormProps) => {
  const [isCreating, setIsCreating] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [question, setQuestion] = useState<questions[]>(initialData?.questions || []);
  const toggleCreating = () => setIsCreating((current) => !current);
  const router = useRouter();

  const notify: any = () =>
    toast.success("Thêm mới question thành công!", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
  });

  const form = useForm<z.infer<typeof QuestionSchema>>({
    resolver: zodResolver(QuestionSchema)
  });
  const { isSubmitting, isValid } = form.formState;
  const { id } = useParams();
  const idQuizz = parseInt(id as string);
  const fetchQuestions = async () => {
    try {
      const response = await fetch(`/api/quizz/${idQuizz}/question`);
      if (response.ok) {
        const data = await response.json();
        setQuestion(data);
      }
    } catch (error) {
      console.error("Error fetching questions:", error);
    }
  };
  useEffect(() => {
      fetchQuestions();
  }, [idQuizz]);

  const onSubmit = async (values: any) => {
    const formValues = {
      content: values.content,
      quizzId: idQuizz,
    };
    const respone = await fetch( `/api/quizz/${idQuizz}/question`,{
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formValues),
      }
    );
    fetchQuestions();
    if (respone.ok) {
      notify();
      setTimeout(() => {
        toggleCreating();
      }, 2000);
    } else {
      console.error("Error during Create:", respone.statusText);
    }
  }

  return (
    <div className="relative mt-6 border bg-slate-100 rounded-md p-4">
      {isUpdating && (
        <div className="absolute h-full w-full bg-slate-500/20 top-0 right-0 rounded-m flex items-center justify-center">
          <Loader2 className="animate-spin h-6 w-6 text-sky-700" />
        </div>
      )}
      <div className="font-medium flex items-center justify-between">
        Danh sách câu hỏi
        <button className="flex justify-between hover:text-green-500" onClick={toggleCreating} type="button">
          {isCreating ? (<>Hủy</>):(<><PlusCircle className="h-6 w-4 mr-1"/>Thêm câu hỏi</>)}
        </button>
      </div>
      {isCreating && (
        <Form {...form}>
        <form className="space-y-4 mt-4" onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    disabled={isSubmitting}
                    placeholder="Nhập tên question mới"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
          )}/>
          <Button disabled={!isValid || isSubmitting} type="button" onClick={form.handleSubmit(onSubmit)}>
            Lưu
          </Button>
          <ToastContainer />
        </form>
      </Form>
      )}
      {!isCreating  && (
        <div className={cn("text-sm mt-2", !initialData?.questions?.length && "text-slate-500 italic")}>
          {!question?.length && "Chưa có câu hỏi nào"}
          <QuestionList items={question || []}/>
        </div>
      )}
    </div>
  );
};
