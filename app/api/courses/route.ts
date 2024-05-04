import prisma from "@/prisma/client";
import { NextRequest,NextResponse } from "next/server";
import { verify, JwtPayload } from "jsonwebtoken";

export async function GET(request: NextRequest) {
  const token = request.headers.get("Authorization")?.replace("Bearer ", "");
  if (!token) {
    return NextResponse.json("Unauthorized", { status: 401 });
  }

  try {
    const decodedToken = verify(token, "secret-key");
    const user = decodedToken as JwtPayload;
    const idUser = user.idUser;
    const roleUser = parseInt(user.roleId)
    const courses = await prisma.courses.findMany({
      where: {
        teacherId: idUser,
      },
      orderBy:{
        titleCourse: "desc"
      }
    });

    return NextResponse.json({courses: courses },{ status: 200})
  } catch (error) {
    console.error("Lỗi lấy courses:", error);
    return NextResponse.json("Internal Server Error", { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  const token = request.headers.get("Authorization")?.replace("Bearer ", "");
  if (!token) {
    return NextResponse.json("Unauthorized", { status: 401 });
  }

  try {
    const decodedToken = verify(token, "secret-key");
    const user = decodedToken as JwtPayload;
    const idUser = user.idUser;
    const body = await request.json();
    
    const courses = await prisma.courses.create({
      data: {
        titleCourse: body.titleCourse,
        price: body.price,
        introduce: body.introduce,
        image: body.image,
        isPublished: body.isPublished,
        teacherId: idUser,
      },
    });
    
    return NextResponse.json({ courses: courses, message: "Tạo khóa học thành công" },{ status: 201 });
  } catch (error) {
    return NextResponse.json("Error", { status: 500 });
  }
}
