import prisma from "@/prisma/client";
import { NextRequest,NextResponse } from "next/server";

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  let idCheck = parseInt(params.id);
  const lessons = await prisma.lessons.findUnique({
    where:{idLessons: idCheck}
  });
  return NextResponse.json(lessons);
}

export async function DELETE( request: NextRequest, { params }: { params: { id: string }}) {
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

export async function PUT(req: NextRequest,{params}:{params:{id: string}}){
  const body = await req.json()
  let idCheck = parseInt(params.id);
  try{
    const updateLesson = await prisma.lessons.update({
      where: {
        idLessons: idCheck,
      },
      data:{
        titleLessons: body.titleLessons,
        isPublished: body.isPublished,
        video: body.video
      }
    });
    const createAttachment = await prisma.assignments.create({
      data:{
        idLessons: idCheck,
        urlAssignment: body.urlAssignment,
        titleAssignment: body.urlAssignment.split("/").pop()
      }
    })
    return NextResponse.json({updatelesson: updateLesson,attachment: createAttachment,message: "Cập nhật thành công"},{status: 202},)
  }catch(error){
    return NextResponse.json({message: "Lỗi ",},{status: 500})
  }
}
