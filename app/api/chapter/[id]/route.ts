import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, {params}:{params: {id: string}}) {
  const idCheck = parseInt(params.id)
  const chapter = await prisma.chapters.findUnique({
    where:{
      idChapter: idCheck
    }
  })
  return NextResponse.json(chapter)
}

export async function DELETE( request: NextRequest, { params }: { params: { id: string } }) {
  let idCheck = parseInt(params.id);
  if (idCheck !== -1) {
    await prisma.assignments.deleteMany({
      where:{
        lessons:{
          chapters:{
            idChapter: idCheck
          }
        }
      }
    })

    await prisma.videolesson.deleteMany({
      where:{
        lessons:{
          chapters:{
            idChapter: idCheck
          }
        }
      }
    })
    const deleteLesson = await prisma.lessons.deleteMany({
      where: {
        chapterId: idCheck,
      },
    });
    const deleteChapter = await prisma.chapters.delete({
      where: {
        idChapter: idCheck,
      },
    });
    const chapters = await prisma.chapters.findMany();
    return NextResponse.json("Xóa chương thành công", {status: 201});
  } else {
    return NextResponse.json({ message: "Xóa chương thất bại" });
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const body = await request.json();
    let idCheck = parseInt(params.id);
    const updateChapter = await prisma.chapters.update({
      where: {
        idChapter: idCheck,
      },
      data: {
        titleChapter: body.titleChapter,
        description: body.description,
        isPublished: body.isPublished,
      },
    });
    return NextResponse.json({ chapter: updateChapter, message: "Chapter updated successfully" },{ status: 202 });
  } catch (error) {
    return NextResponse.json({ message: "Something went wrong!" },{ status: 500 });
  }
}