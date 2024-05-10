import prisma from "@/prisma/client";
import { NextRequest,NextResponse } from "next/server";
import { verify, JwtPayload } from "jsonwebtoken";

export async function POST(req: NextRequest, {params}:{params:{id: string}}){
    const idCheck = parseInt(params.id)
    const token = req.headers.get("Authorization")?.replace("Bearer ", "");
    if (!token) {
        return NextResponse.json("Unauthorized", { status: 401 });
    }

    try {
        const decodedToken = verify(token, "secret-key");
        const user = decodedToken as JwtPayload;
        const idUser = user.idUser;
        await prisma.courseuser.create({
            data:{
                courseId: idCheck,
                userId: idUser,
                isFinished: false
            }
        })
    
        return NextResponse.json({message: "Đã lưu thông tin courseuser" },{ status: 200})
      } catch (error) {
        console.error("Lỗi lấy courses:", error);
        return NextResponse.json("Internal Server Error", { status: 500 });
    }
}