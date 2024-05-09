import prisma from "@/prisma/client"
import { NextResponse } from "next/server"

export async function GET(){
    const users = await prisma.users.findMany()
    return NextResponse.json(users)
}