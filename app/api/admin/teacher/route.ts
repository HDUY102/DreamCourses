import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { hash } from "bcrypt";

export async function GET() {
  const teacher = await prisma.users.findMany({
    where: {
      roleId: 3,
    },
  });
  return NextResponse.json(teacher);
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { username, password } = body;
    console.log(typeof body);
    // check if username already exists
    const existingUserByUsername = await prisma.users.findFirst({
      where: {
        username: username,
        // roleId: 3
      },
    });
    if (existingUserByUsername) {
      return NextResponse.json(
        { user: null, message: "Username giảng viên đã tồn tại" },
        { status: 409 }
      );
    }
    const hashedPassword = await hash(password, 3);
    const newUser = await prisma.users.create({
      data: {
        username: username,
        password: hashedPassword,
        roleId: 3,
        dateCreate: new Date(),
        isLocked: false
      },
    });
    return NextResponse.json(
      { user: newUser, message: "Đăng ký tài khoản giảng viên thành công" },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json({ message: "Lỗi!" }, { status: 500 });
  }
}
