import prisma from "@/prisma/client";
import { NextResponse } from "next/server";

export async function GET() {
  const course = await prisma.courses.findMany();
  return NextResponse.json(course);
}
