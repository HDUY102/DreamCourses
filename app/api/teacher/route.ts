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
    const Username = user.username.toString();
    const teacher = await prisma.users.findFirst({
        where:{
          username: Username
        }
    })
    return NextResponse.json(teacher)
  } catch (error) {
    console.error("Lỗi lấy name teacher:", error);
    return NextResponse.json("Internal Server Error", { status: 500 });
  }
}
