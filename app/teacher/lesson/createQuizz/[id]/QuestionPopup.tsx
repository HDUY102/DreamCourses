import { useParams } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as z from "zod";
import React, { useEffect, useState } from 'react'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Textarea } from "@/components/ui/textarea";
import { Pencil } from "lucide-react";

const QuestionSchema = z.object({
  content: z.string().min(1),
  Acontent: z.string().min(1),
  Bcontent: z.string().min(1),
  Ccontent: z.string().min(1),
  Dcontent: z.string().min(1),
  answer: z.string().min(1),
});

const QuestionPopup = ({isVisible,onClose, selectedQuestion}:any) => {
  const notify: any = () =>
    toast.success("Thêm mới question thành công!", {
      position: "top-right",
      autoClose: 1500,
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
  if(!isVisible) return null

  const form = useForm<z.infer<typeof QuestionSchema>>({
    resolver: zodResolver(QuestionSchema)
  });
  const { isSubmitting, isValid } = form.formState;
  //close popup
  const handleClose = (e:any) => {
    if(e.target.id === 'wrapper') onClose()
  }
  //submit popup
  const [isSuccess, setIsSuccess] = useState(false);
  const { id } = useParams();
  const idLesson = parseInt(id as string);
  const [isUpdate, setIsUpdate] = useState(false);
  useEffect(() => {
    if (selectedQuestion) {
      form.setValue("content", selectedQuestion.content);
      form.setValue("Acontent", selectedQuestion.Acontent);
      form.setValue("Bcontent", selectedQuestion.Bcontent);
      form.setValue("Ccontent", selectedQuestion.Ccontent);
      form.setValue("Dcontent", selectedQuestion.Dcontent);
      form.setValue("answer", selectedQuestion.answer);
      setIsUpdate(true);  
    }
  }, [selectedQuestion]);

  const onSubmit = async (values: any) => {
    const formValues = {
      content: values.content,
      Acontent: values.Acontent,
      Bcontent: values.Bcontent,
      Ccontent: values.Ccontent,
      Dcontent: values.Dcontent,
      answer: values.answer,
      quizzId: idLesson,
    };
    console.log("formValues ",formValues)
    if (isUpdate) {
      const response = await fetch(`/api/question/${selectedQuestion.idQuestion}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formValues),
      });
      if (response.ok) {
        setIsSuccess(true);
        notifyUpdate();
        setTimeout(() => {
          onClose();
        }, 2000);
      } else {
        console.log("Lỗi,không thể cập nhật");
      }
    } else {
      const response = await fetch(`/api/quizz/${idLesson}/question`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formValues),
      });
      if (response.ok) {
        setIsSuccess(true);
        notify();
        setTimeout(() => {
          onClose();
        }, 2000);
      } else {
        console.log("Lỗi, không thể tạo question");
      }
    }
  }
  // useEffect(() => {
  //   if (isSuccess) {
  //     onClose();
  //   }
  // }, [isSuccess]);
  return (
    <div id="wrapper" onClick={handleClose} className='flex justify-center items-center fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm'>
      <div className='w-[600px] flex flex-col'>
        <button onClick={()=> onClose()} className='text-white text-xl place-self-end'>X</button>
        <div className='bg-white p-2 rounded'>
          <Form {...form}>
            <form className="space-y-4 mt-4" onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="content"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Textarea
                        disabled={isSubmitting}
                        placeholder="Nội dung câu hỏi"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
              )}/>
              <FormField
                control={form.control}
                name="Acontent"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Textarea
                        disabled={isSubmitting}
                        placeholder="Đáp án A"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
              )}/>
              <FormField
                control={form.control}
                name="Bcontent"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Textarea
                        disabled={isSubmitting}
                        placeholder="Đáp án B"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
              )}/>
              <FormField
                control={form.control}
                name="Ccontent"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Textarea
                        disabled={isSubmitting}
                        placeholder="Đáp án C"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
              )}/>
              <FormField
                control={form.control}
                name="Dcontent"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Textarea
                        disabled={isSubmitting}
                        placeholder="Đáp án D"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
              )}/>
              <FormField
                control={form.control}
                name="answer"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Textarea
                        disabled={isSubmitting}
                        placeholder="Câu trả lời"
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
        </div>
      </div>
    </div>
  )
}

export default QuestionPopup