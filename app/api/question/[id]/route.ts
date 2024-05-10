import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  let idCheck = parseInt(params.id);
  if (idCheck !== -1) {
    const findQuizzUser = await prisma.quizzuser.count({
      where: { quizzs: { idLessons: idCheck } },
    });

    if (findQuizzUser) {
      return NextResponse.json(
        { message: "Đã có người làm quizz, không cho xóa!" },
        { status: 200 }
      );
    } else {
      const findQuestionToDel = await prisma.questions.findUnique({
        where: { idQuestion: idCheck },
      });
      const findQuizzId = findQuestionToDel?.quizzId;
      await prisma.questions.delete({
        where: { idQuestion: idCheck },
      });
      const questionList = await prisma.questions.findMany({
        where: { quizzId: findQuizzId },
      });
      return NextResponse.json(
        { question: questionList, message: "Xóa question thành công" },
        { status: 201 }
      );
    }
  } else {
    return NextResponse.json({ message: "Xóa question thất bại" });
  }
}

export async function PUT( request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const body = await request.json();
    let idCheck = parseInt(params.id);

    const updateQuestion = await prisma.questions.update({
      where: {
        idQuestion: idCheck,
      },
      data: {
        content: body.content,
        Acontent: body.Acontent,
        Bcontent: body.Bcontent,
        Ccontent: body.Ccontent,
        Dcontent: body.Dcontent,
        answer: body.answer,
      },
    });
    const question = await prisma.questions.findUnique({
      where:{idQuestion: idCheck}
    })
    const quizz = question?.quizzId
    const questionList = await prisma.questions.findMany({
      where:{quizzId: quizz}
    })
    return NextResponse.json({ question: updateQuestion, questionList: questionList, message: "Question updated successfully" },{ status: 202 });
  } catch (error) {
    return NextResponse.json({ message: "Something went wrong!" },{ status: 500 });
  }
}
