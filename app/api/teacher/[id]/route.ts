import prisma from "@/prisma/client"
import {NextRequest, NextResponse} from "next/server"

export async function PATCH(req: NextRequest,{params}: {params: {id: string}}){
    const idCheck = parseInt(params.id)
    const body = await req.json()
    const updateIslocked= await prisma.users.update({
        where:{idUser: idCheck},
        data:{isLocked: body.isLocked}
    })
    return NextResponse.json({message:"Cập nhật isLocked thành công"},{status:202})
}