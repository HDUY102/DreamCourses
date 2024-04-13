import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET( request: NextRequest, { params }: { params: { id: string } }) {
  let idCheck = parseInt(params.id);
  if (idCheck !== -1) {
    const course = await prisma.courses.findFirst({
      where: {
        idCourse: idCheck,
      },
    });
    return NextResponse.json(course);
  } else {
    return NextResponse.json({ message: "thất bại" });
  }
}

export async function DELETE( request: NextRequest, { params }: { params: { id: string } }) {
  let idCheck = parseInt(params.id);
  if (idCheck !== -1) {
    const deleteCourse = await prisma.courses.delete({
      where: {
        idCourse: idCheck,
      },
    });
    return NextResponse.json(deleteCourse);
  } else {
    return NextResponse.json({ message: "Xóa thất bại" });
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const body = await request.json();
    let idCheck = parseInt(params.id);
    const existingCourseById = await prisma.courses.findFirst({
      where: {
        idCourse: idCheck,
      },
    });
    if (!existingCourseById) {
      return NextResponse.json(
        { course: null, message: "Course with this id does not exist" },
        { status: 409 }
      );
    }
    const updateCourse = await prisma.courses.update({
      where: {
        idCourse: idCheck,
      },
      data: {
        titleCourse: body.titleCourse,
        price: body.price,
        introduce: body.introduce,
        // image: body.image,
        isPublic: body.isPublic,
        teacherId: body.teacherId,
      },
    });
    return NextResponse.json(
      { user: updateCourse, message: "Course updated successfully" },
      { status: 202 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Something went wrong!" },
      { status: 500 }
    );
  }
}