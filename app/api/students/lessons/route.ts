import prisma from "@/prisma/client"
import { NextResponse } from "next/server"

export async function GET(){
    const lessons = await prisma.lessons.findMany()
    return NextResponse.json(lessons)
}