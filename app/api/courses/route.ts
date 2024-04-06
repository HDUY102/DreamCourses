import prisma from "@/prisma/client";
import { NextRequest,NextResponse } from "next/server";

export async function GET() {
  const course = await prisma.courses.findMany();
  return NextResponse.json(course);
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const courses = await prisma.courses.create({
      data: {
        idCourse: body.idCourse,
        titleCourse: body.titleCourse,
        price: body.price,
        introduce: body.introduce,
        // image: body.image,
        teacherId: body.teacherId,
      },
    });

    return NextResponse.json(
      { post: courses, message: "Tạo khóa học thành công" },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json("Error", { status: 500 });
  }
}
