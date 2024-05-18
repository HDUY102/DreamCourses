import prisma from "@/prisma/client";
import { NextResponse, NextRequest } from "next/server";
import { verify, JwtPayload } from "jsonwebtoken";

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  const idCheck = parseInt(params.id);

  if (!isNaN(idCheck) && idCheck !== -1) {
    const question = await prisma.questions.findMany({
      where: {
        quizzId: idCheck,
      },
    });
    return new NextResponse(JSON.stringify(question), { status: 200 });
  }
}

export async function POST(req: NextRequest, { params}:{params: {id:string}} ) {
  const idCheck = parseInt(params.id);
  const token = req.headers.get("Authorization")?.replace("Bearer ", "");
  if (!token) {
    return NextResponse.json("Unauthorized", { status: 401 });
  }

  try {

    const decodedToken = verify(token, "secret-key") as JwtPayload;
    const user = decodedToken as JwtPayload;
    const idUser = user.idUser;

    const body = await req.json();
    let { choiced, isCorrect } = body;

    console.log("Received data:", { idCheck, choiced, isCorrect });

    const saveQuestionuser = await prisma.questionuser.createMany({
      data: {
        idQuestion: idCheck,
        idUser: idUser, 
        choiced: choiced,
        isCorrect: isCorrect,
      },
    });

    return NextResponse.json({ post: saveQuestionuser, message: "Đã lưu thông tin question_user" },{ status: 200 });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json("Internal Server Error", { status: 500 });
  }
}