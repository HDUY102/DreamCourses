import { SignJWT } from "jose";
import { NextRequest, NextResponse } from "next/server";
import {getJwtSecretKey} from "@/app/lib/auth"

export async function POST(request:NextRequest) {
  const body = await request.json();
  if (body.username === "admin" && body.password === "admin") {
    const token = await new SignJWT({
      Username: body.username,
    })
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      // .setExpirationTime("5s") 
      .sign(getJwtSecretKey());
    const response = NextResponse.json(
     { success: true },
      { status: 200, headers: { "content-type": "application/json" } }
    );
    response.cookies.set({
      maxAge: 10,
      name: "dctoken",
      value: token,
      path: "/",
    });
    // response.cookies.delete('dctoken')
    return response;
  }
  return NextResponse.json({ success: false });
}