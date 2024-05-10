import prisma from "@/prisma/client";
import { NextRequest,NextResponse } from "next/server";
import Mux from "@mux/mux-node"
const {Video}:any = new Mux({
  tokenId: process.env.MUX_TOKEN_ID!,
  tokenSecret: process.env.MUX_TOKEN_SECRET!,
})
export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  let idCheck = parseInt(params.id);
  const lessons = await prisma.lessons.findUnique({
    where:{idLessons: idCheck}
  });
  const assignments = await prisma.assignments.findFirst({
    where:{idLessons: idCheck}
  })
  const videolesson = await prisma.videolesson.findFirst({
    where:{idLesson: idCheck}
  })
  return NextResponse.json({lesson: lessons, video: videolesson, assignment: assignments});
}

export async function DELETE( request: NextRequest, { params }: { params: { id: string }}) {
  let idCheck = parseInt(params.id);
  if (idCheck !== -1) {
    const findLessonUser = await prisma.lessonuser.count({where: {lessonId: idCheck}})
    if(findLessonUser){
      return NextResponse.json({message: "Đã có người học, không cho xóa!"}, {status: 200})
    }else{
      await prisma.questions.deleteMany({
        where:{
          quizzs:{
            idLessons: idCheck
          }
        }
      })
      
      await prisma.quizzs.deleteMany({
        where:{idLessons: idCheck}
      })
      await prisma.videolesson.deleteMany({
        where: {idLesson: idCheck,},
      });
      await prisma.assignments.deleteMany({
        where: {idLessons: idCheck,},
      });
      await prisma.lessons.delete({
        where: {idLessons: idCheck,},
      });
      const Lessons = await prisma.lessons.findMany();
      return NextResponse.json("Xóa bài học thành công", {status: 201});
    }
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
      }
    });

    const createAttachment = await prisma.assignments.create({
      data:{
        idLessons: idCheck,
        urlAssignment: body.urlAssignment,
        titleAssignment: body.urlAssignment.split("/").pop()
      }
    })

    // if(body.videoUrl){
    //   const existingVideo = await prisma.videolesson.findFirst({
    //     where:{
    //       idLesson: idCheck
    //     }
    //   })
    //   if(existingVideo){
    //     await Video.Assets.del(existingVideo.idAsset)
    //     await prisma.videolesson.delete({
    //       where:{
    //         idVideo: existingVideo.idVideo
    //       }
    //     })
    //   }
    // }
    // const createvideo = await prisma.videolesson.create({
    //   data:{
    //     idLesson: idCheck,
    //     idAsset: body.idAsset,
    //     idPlayback: body.idPlayback
    //     // idPlayback: body.playback_ids?.[0]?.idPlayback
    //   }
    // })

      const lesson = await prisma.lessons.findUnique({
        where: { idLessons: idCheck },
        include: { videolesson: true },
      });
  
      if (!lesson) {
        return NextResponse.json({ message: "Bài học không tồn tại" }, { status: 404 });
      }
  
      if (body.videoUrl) {
        if (lesson.videolesson && Array.isArray(lesson.videolesson) && lesson.videolesson.length > 0) {
          const videoId = lesson.videolesson[0].idVideo; // Lấy idVideo từ phần tử đầu tiên
          await prisma.videolesson.delete({ where: { idVideo: videoId } });
        }
  
        // Tạo video mới
        const createVideo = await prisma.videolesson.create({
          data: {
            idLesson: idCheck,
            idAsset: body.videoUrl,
            idPlayback: body.idPlayback
          },
        });
      }
    // const asset = await Video.Assets.create({
    //   input: body.videoUrl,
    //   playback_policy: "public",
    //   test: false,
    // })
    return NextResponse.json({ updatelesson: updateLesson, attachment: createAttachment, message: "Cập nhật thành công", status: 202 })
  }catch(error){
    return NextResponse.json({message: "Lỗi ",},{status: 500})
  }
}
