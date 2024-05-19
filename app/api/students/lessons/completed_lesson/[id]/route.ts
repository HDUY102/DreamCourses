import prisma from "@/prisma/client";
import { NextResponse, NextRequest } from "next/server";
import { verify, JwtPayload } from "jsonwebtoken";

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  const token = request.headers.get("Authorization")?.replace("Bearer ", "");
  if (!token) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  try {
    let idCheck = parseInt(params.id)
    const decodedToken = verify(token, "secret-key") as JwtPayload;
    const userId = decodedToken.idUser;
    const completedLessons = await prisma.lessonuser.findMany({
      where: {
        userId: userId,
        isFinished: true,
        lessons:{
          chapters:{courses:{idCourse: idCheck}}
        }
      },
    });

    return new NextResponse(JSON.stringify(completedLessons), { status: 200 });
  } catch (error) {
    console.error("Error fetching completed lessons:", error);
    return new NextResponse(
      JSON.stringify({ error: "Failed to fetch completed lessons" }),
      { status: 500 }
    );
  }
}
