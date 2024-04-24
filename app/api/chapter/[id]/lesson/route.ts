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
      },
    })
    return NextResponse.json(lessons)
  } catch (error) {
    console.error("Error fetching lessons:", error)
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

export async function PUT(request: NextRequest,{ params }: { params: { id: string } }) {
  try {
    const body = await request.json();

    for (let item of body){
      await prisma.chapters.update({
        where:{ idChapter: item.idChapter},
        data:{ orderChapter: item.orderChapter}
      })
    }

    return new NextResponse("Thành công ", {status: 200})
  } catch (error) {
    console.error("Error fetching chapters:", error)
    return NextResponse.error()
  }
}