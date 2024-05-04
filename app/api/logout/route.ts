
import { NextRequest, NextResponse } from "next/server";

export async function POST (req: NextRequest){
    const response = NextResponse.json({ message: "Đăng xuất thành công" }, { status: 200 });
    response.cookies.set({
      maxAge: 0,
      name: "token",
      value: "",
      path: "/",
    });
  
    return response;
}