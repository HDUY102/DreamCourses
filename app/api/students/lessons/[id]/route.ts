import prisma from "@/prisma/client";
import { NextResponse, NextRequest } from "next/server";
import { verify, JwtPayload } from "jsonwebtoken";

export async function GET(req: NextRequest, {params}:{params:{id: string}}){
    let idCheck = parseInt(params.id)
    const lessons = await prisma.lessons.findMany({
      where:{
        chapters:{
          courses:{idCourse: idCheck}
        },
        isPublished: true
      }
    })
    return NextResponse.json({lessons}, {status:200})
}

export async function POST(req: NextRequest, { params }: { params:{id: string} }) {
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

    let { isFinished } = body;
    

    const completedLesson = await prisma.lessonuser.create({
      data: {
        lessonId: idCheck,
        userId: idUser, 
        isFinished: isFinished,
      },
    });

    return NextResponse.json(
      { save: completedLesson, message: "Đã lưu thông tin lesson_user" },
      { status: 200 }
    );

  } catch (error) {
    console.error("Error:", error);

    return NextResponse.json("Internal Server Error", { status: 500 });
  }
}