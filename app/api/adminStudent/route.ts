import prisma from "@/prisma/client";
import { NextResponse } from "next/server";

export async function GET() {
    // const result = await prisma.$queryRaw(
    //     prisma.sql`SELECT count(idUser) FROM datn.users GROUP BY MONTH(dateCreate);`
    // )
    const result = await prisma.$queryRaw`SELECT MONTH(dateCreate) as monthCreate, count(idUser) as count FROM users WHERE roleId=2 GROUP BY MONTH(dateCreate);`
    result.forEach((studentObject: any) => {
        studentObject.count = Number(studentObject.count);
      });
    return NextResponse.json(result)
}