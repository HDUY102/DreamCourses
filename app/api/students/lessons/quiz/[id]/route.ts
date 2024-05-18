import prisma from "@/prisma/client";
import { NextResponse, NextRequest } from "next/server";
import { verify, JwtPayload } from "jsonwebtoken";
export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  const idCheck = parseInt(params.id);
  // const token = req.headers.get("Authorization")?.replace("Bearer ", "");
  // if (!token) {
  //     return NextResponse.json("Unauthorized", { status: 401 });
  // }
  if (!isNaN(idCheck) && idCheck !== -1) {
    const quizzes = await prisma.quizzs.findFirst({
      where: {
        idLessons: idCheck,
      },
    });
    return new NextResponse(JSON.stringify(quizzes), { status: 200 });
  } 
}

export async function POST(req: NextRequest, { params}:{params:{id: string}}) {
  const idCheck = parseInt(params.id);
  const token = req.headers.get("Authorization")?.replace("Bearer ", "");
  if (!token) {
    return NextResponse.json("Unauthorized", { status: 401 });
  }

  try {
    const decodedToken = verify(token, "secret-key") as JwtPayload;
    const user = decodedToken as JwtPayload;
    const idUser = user.idUser;
    const saveQuiz = await prisma.quizzuser.createMany({
      data: {
        quizzId: idCheck,
        userId: idUser, 
        isDone: true,
      },
    });

    return NextResponse.json(
      { save: saveQuiz, message: "Đã lưu thông tin quizz_user" },
      { status: 200 }
    );

    
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json("Internal Server Error", { status: 500 });
  }
}