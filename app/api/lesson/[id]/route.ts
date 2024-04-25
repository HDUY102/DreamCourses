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
        // image: body.image,
        isPublished: body.isPublished,
        chapterId: body.chapterId,
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

export async function DELETE( request: NextRequest, { params }: { params: { id: string } }) {
  let idCheck = parseInt(params.id);
  if (idCheck !== -1) {
    const deleteLesson = await prisma.lessons.delete({
      where: {
        idLessons: idCheck,
      },
    });
    return NextResponse.json("Xóa bài học thành công", {status: 201});
  } else {
    return NextResponse.json({ message: "Xóa bài học thất bại" });
  }
}