import prisma from "@/prisma/client";
import { NextResponse } from "next/server";

export async function GET() {
    const result = await prisma.$queryRaw`SELECT MONTH(dateCreate) as monthCreate, count(idUser) as count FROM datn.users where roleId=2 GROUP BY MONTH(dateCreate);`
    result.forEach((revenueObject: any) => {
        revenueObject.count = Number(revenueObject.count)*20000;
      });
    return NextResponse.json(result)
}