import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
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
    const result =
      await prisma.$queryRaw`SELECT MONTH(cu.dateRegistered) as monthRegistered, count(u.idUser) as count FROM courseuser cu
      JOIN courses c On cu.courseId = c.idCourse 
      JOIN users u ON cu.userId = u.idUser
      WHERE c.teacherId = ${idUser} GROUP BY MONTH(cu.dateRegistered);`;
    if(Array.isArray(result)){
      result.forEach((studentObject: any) => {
        studentObject.count = Number(studentObject.count);
      });
    }
    return NextResponse.json(result);
  } catch (error) {
    console.error("Lỗi lấy courses:", error);
    return NextResponse.json("Internal Server Error", { status: 500 });
  }
}
