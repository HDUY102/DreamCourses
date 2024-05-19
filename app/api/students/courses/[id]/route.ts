import prisma from "@/prisma/client";
import { NextRequest,NextResponse } from "next/server";
import { verify, JwtPayload } from "jsonwebtoken";

export async function GET(req: NextRequest, {params}:{params:{id: string}}){
    const idCheck = parseInt(params.id)
    const checkLesson = await prisma.lessons.findFirst({
        where:{
            chapters:{courses:{idCourse:idCheck}},
            isPublished: true,
        },
        select: {
            idLessons: true,
        },
        orderBy:{
            chapters:{
                orderChapter: "asc"
            }
        },
    })
    return NextResponse.json({checkLesson} ,{ status: 200 });

}

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
                isFinished: false,
                dateRegistered: new Date()
            }
        })
    
        return NextResponse.json({message: "Đã lưu thông tin courseuser" },{ status: 200})
      } catch (error) {
        console.error("Lỗi lấy courses:", error);
        return NextResponse.json("Internal Server Error", { status: 500 });
    }
}

export async function PUT(req: NextRequest, {params}:{params:{id: string}}){
    const idCheck = parseInt(params.id)
    const token = req.headers.get("Authorization")?.replace("Bearer ", "");
    if (!token) {
        return NextResponse.json("Unauthorized", { status: 401 });
    }

    try {
        const decodedToken = verify(token, "secret-key");
        const user = decodedToken as JwtPayload;
        const idUser = user.idUser;
        const countLesson = await prisma.lessons.count({
            where:{
                chapters:{
                    courseId: idCheck
                },
                isPublished: true
            }
        })
        const completedLessons = await prisma.lessonuser.count({
            where:{
                isFinished: true,
                userId: idUser,
                lessons:{
                    chapters:{
                        courses:{idCourse: idCheck}
                    }
                }
            }
        })
        if(countLesson == completedLessons){
            await prisma.courseuser.update({
                where: {
                    userId_courseId: {
                        courseId: idCheck,
                        userId: idUser
                    }
                },
                data:{
                    isFinished: true
                }
            })
        }
    
        return NextResponse.json({message: "Đã cập nhật thông tin courseuser" },{ status: 200})
      } catch (error) {
        console.error("Lỗi lấy courses:", error);
        return NextResponse.json("Internal Server Error", { status: 500 });
    }
}