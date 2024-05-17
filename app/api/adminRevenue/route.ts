import prisma from "@/prisma/client";
import { NextResponse } from "next/server";

export async function GET() {
    // const result = await prisma.$queryRaw`SELECT MONTH(dateCreate) as monthCreate, count(idUser) as count FROM datn.users GROUP BY MONTH(dateCreate);`
    const currentYear = new Date().getFullYear();
    const result = await prisma.$queryRaw`
        SELECT MONTH(cu.dateRegistered) as monthRegistered, count(cu.userId) as count 
        FROM datn.courseuser cu
        WHERE YEAR(cu.dateRegistered) = ${currentYear}
        GROUP BY MONTH(cu.dateRegistered);`
    result.forEach((revenueObject: any) => {
        revenueObject.count = Number(revenueObject.count)*50000;
      });
    return NextResponse.json(result)
}