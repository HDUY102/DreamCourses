import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest,{ params }: { params: { id: string } }) {
  let idCheck = parseInt(params.id)
  try {
    const questions = await prisma.questions.findMany({
      where: {
        quizzs:{idLessons:idCheck}
      },
      orderBy: {
        idQuestion: 'asc'
      }
    })
    return NextResponse.json(questions)
  } catch (error) {
    console.error("Error fetching chapters:", error)
    return NextResponse.error()
  }
}

export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
    try {
      const body = await request.json();
      let idCheck = parseInt(params.id)
  
      // check quizz already exists or not
      const existingQuizzByIdLesson = await prisma.quizzs.findUnique({
          where:{ idLessons: idCheck}    
      });
      if(!existingQuizzByIdLesson){
          return NextResponse.json({quizz: null, message:"Không có quizz tồn tại"})
      }
  
      const question = await prisma.questions.create({
        data: {
          content: body.content,
          quizzId: existingQuizzByIdLesson.idQuizz,
          Acontent: body.Acontent,
          Bcontent: body.Bcontent,
          Ccontent: body.Ccontent,
          Dcontent: body.Dcontent,
          answer: body.answer
        },
      });
      const questionList = await prisma.questions.findMany({
        where:{quizzId: existingQuizzByIdLesson.idQuizz}
      })
      return NextResponse.json({ question: question,questionList: questionList, message: "Tạo Question thành công" },{ status: 201 });
    } catch (error) {
      return NextResponse.json("Error", { status: 500 });
    }
}