import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { verify, JwtPayload } from "jsonwebtoken";

export async function GET(req: NextRequest) {
  const token = req.headers.get("Authorization")?.replace("Bearer ", "");
  try {
    let courses
    if(token){
      const decodedToken = verify(token, "secret-key");
      const user = decodedToken as JwtPayload;
      const idUser = user.idUser;

      const courseuser = await prisma.courseuser.findMany({
          where: { userId: idUser }
      });
      const courseIds = courseuser.map(course => course.courseId);

      courses = await prisma.courses.findMany({
          where: {
              isPublished: true,
              idCourse: { notIn: courseIds }
          },
          include: {
              users: {
                  select: { username: true }
              }
          }
      });
    }else{
      courses = await prisma.courses.findMany({
        where: {
          isPublished: true
      },
      include: {
          users: {
              select: { username: true }
          }
      }
      })
    }

    return NextResponse.json({ courses: courses }, { status: 200 });
  } catch (error) {
    console.error("Lỗi lấy courses:", error);
    return NextResponse.json("Internal Server Error", { status: 500 });
  }
}
