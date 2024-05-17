import prisma from "@/prisma/client";
import { NextResponse } from "next/server";

export async function GET() {
  const currentYear = new Date().getFullYear();
  const result = await prisma.$queryRaw`
    SELECT MONTH(cu.dateRegistered) as monthRegistered, count(cu.userId) as count 
      FROM datn.courseuser cu
      WHERE YEAR(cu.dateRegistered) = ${currentYear}
      GROUP BY MONTH(cu.dateRegistered);`
  // const result = await prisma.$queryRaw`SELECT MONTH(dateCreate) as monthCreate, count(idUser) as count FROM users WHERE roleId=2 GROUP BY MONTH(dateCreate);`
  result.forEach((studentObject: any) => {
      studentObject.count = Number(studentObject.count);
    });
  return NextResponse.json(result)
}