import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest,{ params }: { params: { id: string } }) {
  let idCheck = parseInt(params.id)
  try {
    const lessons = await prisma.lessons.findMany({
      where: {
        chapterId: idCheck
      },
      orderBy: {
        orderLesson: 'asc'
      }
    })
    return NextResponse.json(lessons)
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
    const existingChapterById = await prisma.chapters.findFirst({
        where:{
          idChapter : idCheck
        }    
    });
    if(!existingChapterById){
        return NextResponse.json({user: null, message:"Không có chapters tồn tại"})
    }

    const lastLesson = await prisma.lessons.findFirst({
      where:{
        chapterId: idCheck
      },
      orderBy:{
        orderLesson: "desc"
      }
    })

    let newOrder: number;
    if (lastLesson && lastLesson.orderLesson !== null) {
      newOrder = lastLesson.orderLesson + 1;
    } else {
      newOrder = 0;
    }

    const lessons = await prisma.lessons.create({
      data: {
        titleLessons: body.titleLessons,
        orderLesson: newOrder,
        isPublished: body.isPublished,
        chapterId: idCheck,
        videoUrl: body.videoUrl
      },
    });

    return NextResponse.json({ post: lessons, message: "Tạo bài học thành công" },{ status: 201 });
  } catch (error) {
    return NextResponse.json("Error", { status: 500 });
  }
}

export async function PUT(request: NextRequest,{ params }: { params: { id: string } }) {
  try {
    const body = await request.json();

    for (let item of body){
      await prisma.lessons.update({
        where:{ idLessons: item.idLessons},
        data:{ orderLesson: item.orderLesson}
      })
    }
    return new NextResponse("Thành công ", {status: 200})
  } catch (error) {
    console.error("Error fetching lessons:", error)
    return NextResponse.error()
  }
}