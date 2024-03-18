import { NextRequest,NextResponse } from "next/server";
import prisma from "@/prisma/client";
import RegisterSchema from "@/app/api/register/RegisterSchema";
import { hash  } from "bcrypt"

export async function POST(request:NextRequest) {
    try{
        const body = await request.json();
        const {username,password}=body;
        console.log(typeof(body))
        // check if username already exists
        const existingUserByUsername = await prisma.users.findFirst({
            where:{
                username : username
            }    
        });
        if(existingUserByUsername){
            return NextResponse.json({user: null, message:"Username đã tồn tại"},
            {status:409})
        }
        const hashedPassword = await hash(password,3)
        // Check validate for register before adding to db
        const validation = RegisterSchema.safeParse(body)
        console.log(typeof(validation))
        if(!validation.success){
            return Response.json(validation.error.errors,{status:400})
        }else{
            const newUser = await prisma.users.create({
                data: {
                    username: username,
                    password: hashedPassword,
                    roleId: 3,
                    dateCreate: new Date()
                }
            })
            return NextResponse.json({user: newUser, message:"Đăng ký tài khoản giảng viên thành công"},{status: 201});
        }
    }catch(error){
        return NextResponse.json({message:"Lỗi!"},{status: 500});
    }
}