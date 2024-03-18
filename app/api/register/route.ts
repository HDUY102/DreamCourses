import { NextRequest,NextResponse } from "next/server";
import prisma from "@/prisma/client";
import RegisterSchema from "./RegisterSchema";
import { hash  } from "bcrypt"

export async function POST(request:NextRequest) {
    try{
        const body = await request.json();
        const {username,password}=body;
        //check if username already exists
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
        //Check validate for register before adding to db
        const validation = RegisterSchema.safeParse(body)
        // if(!validation.success){
        //     return Response.json(validation.error.errors,{status:400})
        // }else{
            //add new user to mysql db
            const newUser = await prisma.users.create({
                data: {
                    username: username,
                    password: hashedPassword,
                    roleId: 2
                }
            })
            return NextResponse.json({user: newUser, message:"Đăng ký thành công"},{status: 201});
        // }
    }catch(error){
        return NextResponse.json({message:"Lỗi!"},{status: 500});
    }
}