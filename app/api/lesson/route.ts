import prisma from "@/prisma/client";
import { NextRequest,NextResponse } from "next/server";

export async function GET() {
  const lessons = await prisma.lessons.findMany();
  return NextResponse.json(lessons);
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const lessons = await prisma.lessons.create({
      data: {
        titleLessons: body.titleLessons,
        chapterId: body.chapterId,
        isPublished: body.isPublished,
        video: body.video,
      },
    });

    return NextResponse.json(
      { post: lessons, message: "Tạo bài học thành công" },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json("Error", { status: 500 });
  }
}
