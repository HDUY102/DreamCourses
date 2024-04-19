import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

// export async function GET({ params }: { params: { id: string } }) {
//   let idCheck = parseInt(params.id)
//   console.log("id "+idCheck)
//   const chapters = await prisma.$queryRaw`SELECT titleChapter as titleChapter FROM chapters where courseId= ${idCheck} order by titleChapter asc`;
//   result.forEach((chapterOrder: any) => {
//     chapterOrder.count = Number(chapterOrder.count);
//   });
//   return NextResponse.json(idCheck);
// }

export async function GET(request: NextRequest,{ params }: { params: { id: string } }) {
  let idCheck = parseInt(params.id)
  try {
    const chapters = await prisma.chapters.findMany({
      where: {
        courseId: idCheck
      },
      orderBy: {
        orderChapter: 'asc'
      },
      select: {
        titleChapter: true
      }
    })
    const titleChapters = chapters.map(chapter => chapter.titleChapter)
    return NextResponse.json(titleChapters)
  } catch (error) {
    console.error("Error fetching chapters:", error)
    return NextResponse.error()
  }
}

export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const body = await request.json();
    let idCheck = parseInt(params.id)

    //check Course already exists or not
    const existingCourseById = await prisma.courses.findFirst({
        where:{
          idCourse : idCheck
        }    
    });
    if(!existingCourseById){
        return NextResponse.json({user: null, message:"Không có courses tồn tại"})
    }

    const lastChapter = await prisma.chapters.findFirst({
      where:{
          courseId: idCheck
      },
      orderBy:{
          orderChapter: "desc"
      }
    })
    let newOrder: number;
    if (lastChapter && lastChapter.orderChapter !== null) {
      newOrder = lastChapter.orderChapter + 1;
    } else {
      newOrder = 1;
    }

    const chapters = await prisma.chapters.create({
      data: {
        titleChapter: body.titleChapter,
        orderChapter: newOrder,
        description: body.description,
        isPublished: body.isPublished,
        courseId: idCheck,
      },
    });

    return NextResponse.json({ post: chapters, message: "Tạo chương học thành công" },{ status: 201 });
  } catch (error) {
    return NextResponse.json("Error", { status: 500 });
  }
}
