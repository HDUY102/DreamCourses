import prisma from "@/prisma/client"
import { NextRequest, NextResponse } from "next/server"
import { verify, JwtPayload } from "jsonwebtoken";

export async function GET(req: NextRequest){
  const token = req.headers.get("Authorization")?.replace("Bearer ", "");
  if (!token) {
    return NextResponse.json("Unauthorized", { status: 401 });
  }

  try {
    const decodedToken = verify(token, "secret-key");
    const user = decodedToken as JwtPayload;
    const idUser = user.idUser;
    // tìm courseuser thông qua idUser
    const courseuser = await prisma.courseuser.findMany({
        where:{ userId: idUser}
    })
    // lọc idCourse theo trong từng courseuser
    const courseIds = courseuser.map(course => course.courseId);
    // join các bảng để lấy thông tin của course lẫn username, chapter và lesson
    const courses = await prisma.courses.findMany({
        where: { idCourse: { in: courseIds } },
        include: {
            users: {
              select: { username: true }
            },
            chapters:{
              include: {
                lessons: {where: { isPublished: true }}
              }
            }
        }
    });
    return NextResponse.json({courses: courses},{ status: 200})
  } catch (error) {
    console.error("Lỗi lấy courses:", error);
    return NextResponse.json("Internal Server Error", { status: 500 });
  }
}