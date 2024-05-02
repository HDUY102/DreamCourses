import prisma from "@/prisma/client";
import { NextRequest,NextResponse } from "next/server";

export async function GET() {
  const teacher = await prisma.users.findMany({
      where:{
        roleId: 3
      }
  })
  return NextResponse.json(teacher)
}

export async function PATCH(request: NextRequest,{params}: {params: { id: string }}){
  const body = await request.json()
  let idCheck = parseInt(params.id);
  if (idCheck !== -1) {
    const teacher = await prisma.users.update({
      where: {
        idUser: idCheck,
      },
      data:{isLocked: body.isLocked}
    });
    return NextResponse.json(teacher);
  } else {
    return NextResponse.json({ message: "thất bại" });
  }
}