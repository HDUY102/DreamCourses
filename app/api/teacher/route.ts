import prisma from "@/prisma/client";
import { NextResponse } from "next/server";

export async function GET() {
    const teacher = await prisma.users.findMany({
        where:{
            roleId: 3
        }
    })
    return NextResponse.json(teacher)
}