import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest,{params}:{params: {id: string}}) {
  let idCheck = parseInt(params.id)
  try {
    const quizz = await prisma.quizzs.findFirst({
      where:{idQuizz: idCheck}
    })
    return NextResponse.json(quizz)
  } catch (error) {
    console.error("Error fetching quizz:", error)
    return NextResponse.error()
  }
}