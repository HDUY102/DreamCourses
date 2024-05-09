import prisma from "@/prisma/client"
import { NextResponse } from "next/server"

export async function GET(){
    const courses = await prisma.courses.findMany()
    return NextResponse.json(courses)
}