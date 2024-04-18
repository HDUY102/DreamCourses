import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  //   const chapters = await prisma.chapters.findMany({
  //     include:{
  //         chapters:{
  //             orderBy:{
  //                 order: "asc"
  //             }
  //         }
  //     },

  //   });
  const chapters = await prisma.$queryRaw`SELECT orderChapter as orderChapter FROM chapters order by orderChapter asc`;
  result.forEach((chapterOrder: any) => {
    chapterOrder.count = Number(chapterOrder.count);
  });
  return NextResponse.json(chapters);
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    // const {idCourse}=body;
    // //check if username already exists
    // const existingCourseById = await prisma.courses.findFirst({
    //     where:{
    //         idCourse : idCourse
    //     }    
    // });
    // if(existingCourseById){
    //     return NextResponse.json({user: null, message:"Không có courses tồn tại"})
    // }
    const chapters = await prisma.chapters.create({
      data: {
        titleChapter: body.titleChapter,
        orderChapter: body.orderChapter,
        description: body.description,
        isPublished: body.isPublished,
        courseId: body.courseId,
      },
    });

    return NextResponse.json({ post: chapters, message: "Tạo chương học thành công" },{ status: 201 });
  } catch (error) {
    return NextResponse.json("Error", { status: 500 });
  }
}
