import prisma from "@/prisma/client";
import { NextResponse } from "next/server";

export async function GET() {
  const currentYear = new Date().getFullYear();
  const result = await prisma.$queryRaw`
    SELECT MONTH(dateCreate) as monthCreated, count(idUser) as count 
      FROM users 
      WHERE YEAR(dateCreate) = ${currentYear} and roleId not in (1,3)
      GROUP BY monthCreated;`
  // const result = await prisma.$queryRaw`SELECT MONTH(dateCreate) as monthCreate, count(idUser) as count FROM users WHERE roleId=2 GROUP BY MONTH(dateCreate);`
  if(Array.isArray(result)){
    result.forEach((studentObject: any) => {
      studentObject.count = Number(studentObject.count);
    });
  }
  return NextResponse.json(result)
}