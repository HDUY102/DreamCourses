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
//   const chapters = await prisma.$queryRaw`SELECT orderChapter as orderChapter FROM chapters order by orderChapter asc`;
//   result.forEach((chapterOrder: any) => {
//     chapterOrder.count = Number(chapterOrder.count);
//   });
//   return NextResponse.json(chapters);
}

export async function DELETE( request: NextRequest, { params }: { params: { id: string } }) {
  let idCheck = parseInt(params.id);
  if (idCheck !== -1) {
    const deleteCourse = await prisma.chapters.delete({
      where: {
        idChapter: idCheck,
      },
    });
    return NextResponse.json("Xóa chương thành công", {status: 201});
  } else {
    return NextResponse.json({ message: "Xóa chương thất bại" });
  }
}
