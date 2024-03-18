import prisma from "@/prisma/client";
import { NextResponse } from "next/server";

export async function GET() {
    const teacher = await prisma.users.findMany()
    return NextResponse.json(teacher)
}