import prisma from "@/prisma/client";
import { NextRequest,NextResponse } from "next/server";

export async function GET() {
  console.log('dang o trong get')
  const course = await prisma.courses.findMany();
  return NextResponse.json(course);
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    const courses = await prisma.courses.create({
      data: {
        titleCourse: body.titleCourse,
        price: body.price,
        introduce: body.introduce,
        image: body.image,
        isPublished: body.isPublished,
        teacherId: body.teacherId,
      },
    });
    
    // console.log("course"+courses)
    return NextResponse.json(
      { courses: courses, message: "Tạo khóa học thành công" },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json("Error", { status: 500 });
  }
}
