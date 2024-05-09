import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest,{ params }: { params: { id: string } }) {
  let idCheck = parseInt(params.id);
  try {
    const quizz = await prisma.quizzs.findFirst({
      where: { idLessons: idCheck },
    });
    return NextResponse.json(quizz);
  } catch (error) {
    console.error("Error fetching quizz:", error);
    return NextResponse.error();
  }
}

export async function POST(request: NextRequest,{ params }: { params: { id: string } }) {
  let idCheck = parseInt(params.id);
  const body = await request.json();
  try {
    const quizzs = await prisma.quizzs.create({
      data: {
        idLessons: idCheck,
        nameQuizz: body.nameQuizz,
        description: body.description,
      },
    });
    return NextResponse.json(quizzs);
  } catch (error) {
    console.error("Error fetching quizz:", error);
    return NextResponse.error();
  }
}

export async function PUT(request: NextRequest,{ params }: { params: { id: string }}) {
  let idCheck = parseInt(params.id);
  const body = await request.json();
  try {
    const findQuizz = await prisma.quizzs.findFirst({
      where:{idLessons: idCheck}
    })
    const quizzs = await prisma.quizzs.update({
      where: { idQuizz: findQuizz?.idQuizz },
      data: {
        nameQuizz: body.nameQuizz,
        description: body.description,
      },
    });
    return NextResponse.json(quizzs);
  } catch (error) {
    console.error("Error fetching quizz:", error);
    return NextResponse.error();
  }
}
