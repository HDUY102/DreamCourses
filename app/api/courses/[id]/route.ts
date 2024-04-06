import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

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
