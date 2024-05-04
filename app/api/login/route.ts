import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import { compare } from "bcrypt";
import {sign} from "jsonwebtoken"

export async function POST(request:NextRequest) {
  const body = await request.json();
  const {username,password} = body
  if(body.username === "admin" && body.password === "admin"){
    console.log("admin")
    return NextResponse.json({message: "Đăng nhập admin thành công"},{status: 200});
  }else{
    const user = await prisma.users.findFirst({
      where: { username }
    });
    if (!user || !(await compare(password, user.password))){
      return NextResponse.json({ message: "Sai tên đăng nhập hoặc mật khẩu" }, { status: 401 });
    }
    const role = user.roleId;
    const idUser = user.idUser
    const token = sign({ username, role ,idUser}, "secret-key", { expiresIn: "30m" });
    const response = NextResponse.json({id: user.idUser,success: token },{ status: 200, headers: { "content-type": "application/json" }})
    // response.cookies.set({
    //   maxAge: 1,
    //   name: "token",
    //   value: token,
    //   path: "/",
    // })

    return response;
  }
}