import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { verify, JwtPayload } from "jsonwebtoken";

export async function GET(request: NextRequest,{ params }: { params: { id: string }}) {
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

export async function DELETE(request: NextRequest,{ params }: { params: { id: string } }) {
    let idCheck = parseInt(params.id);
    if (idCheck !== -1) {
      const findCourseUser = await prisma.courseuser.count({ where: { courseId: idCheck } })

      if (findCourseUser) {
          return NextResponse.json({ message: "Đã có người học, không cho xóa!" }, { status: 200 });
      }else{
          await prisma.questions.deleteMany({
            where: {
              quizzs: {
                lessons: {
                  chapters:{courseId: idCheck},
                }
              }
            }
          });
          
          const findChapter = await prisma.chapters.findMany({
            where: { courseId: idCheck }
          });
          
          for (const chapter of findChapter) {
            await prisma.quizzs.deleteMany({
              where: { lessons: { chapterId: chapter.idChapter } }
            });
          }
          await prisma.assignments.deleteMany({
            where: {
              lessons: {
                chapters:{courseId: idCheck},
              },
            },
          });
          await prisma.lessons.deleteMany({
            where: {
              chapters: {courseId:idCheck},
            },
          });
    
          await prisma.chapters.deleteMany({
            where: { courseId: idCheck },
          });
          await prisma.courses.delete({
            where: { idCourse: idCheck },
          });
          return NextResponse.json({ message: "Xóa khóa học thành công!" },{ status: 201 });
      }
    } else {
      return NextResponse.json({ message: "Xóa thất bại" });
    }
}

export async function PUT(request: NextRequest,{ params }: { params: { id: string } }) {
  const token = request.headers.get("Authorization")?.replace("Bearer ", "");
  if (!token) {
    return NextResponse.json("Unauthorized", { status: 401 });
  }
  try {
    const decodedToken = verify(token, "secret-key");
    const user = decodedToken as JwtPayload;
    const idUser = user.idUser;
    const body = await request.json();
    let idCheck = parseInt(params.id);
    const existingCourseById = await prisma.courses.findFirst({
      where: {
        idCourse: idCheck,
      },
    });
    if (!existingCourseById) {
      return NextResponse.json({ course: null, message: "Course với id này không tồn tại" },{ status: 409 });
    }
    const updateCourse = await prisma.courses.update({
      where: {
        idCourse: idCheck,
      },
      data: {
        titleCourse: body.titleCourse,
        price: body.price,
        introduce: body.introduce,
        image: body.image,
        isPublished: body.isPublished,
        teacherId: idUser,
      },
    });
    return NextResponse.json({ user: updateCourse, message: "Course updated successfully" },{ status: 202 });
  } catch (error) {
    return NextResponse.json({ message: "Something went wrong!" },{ status: 500 });
  }
}
