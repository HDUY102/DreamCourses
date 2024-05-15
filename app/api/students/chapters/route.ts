import prisma from "@/prisma/client"
import { NextResponse } from "next/server"

export async function GET(){
    const chapters = await prisma.chapters.findMany({
        orderBy:{orderChapter: "asc"}
    })
    return NextResponse.json(chapters)
}