import prisma from "@/prisma/client";
import { NextResponse } from "next/server";

export async function GET() {
  // const result = await prisma.$queryRaw`SELECT MONTH(dateCreate) as monthCreate, count(idUser) as count FROM datn.users GROUP BY MONTH(dateCreate);`
  const currentYear = new Date().getFullYear();
  const result = await prisma.$queryRaw`
        SELECT MONTH(u.dateCreate) as monthCreated, count(u.idUser) as count 
        FROM datn.users u
        WHERE YEAR(u.dateCreate) = ${currentYear} and not roleId=1
        GROUP BY monthCreated;`;
  if (Array.isArray(result)) {
    result.forEach((revenueObject: any) => {
      revenueObject.count = Number(revenueObject.count) * 50000;
    });
  }
  return NextResponse.json(result);
}
