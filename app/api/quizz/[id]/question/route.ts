import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest,{ params }: { params: { id: string } }) {
  let idCheck = parseInt(params.id)
  try {
    const questions = await prisma.questions.findMany({
      where: {
        quizzId: idCheck
      },
      orderBy: {
        content: 'asc'
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
  
      //check quizz already exists or not
      const existingQuizzById = await prisma.quizzs.findFirst({
          where:{
            idQuizz : idCheck
          }    
      });
      if(!existingQuizzById){
          return NextResponse.json({quizz: null, message:"Không có quizz tồn tại"})
      }
  
      const question = await prisma.questions.create({
        data: {
          content: body.content,
          quizzId: idCheck,
        },
      });
  
      return NextResponse.json({ question: question, message: "Tạo Question thành công" },{ status: 201 });
    } catch (error) {
      return NextResponse.json("Error", { status: 500 });
    }
}