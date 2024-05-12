import { NextRequest,NextResponse } from "next/server";
import { verify, JwtPayload } from "jsonwebtoken";
import prisma from "@/prisma/client";

export async function GET(req: NextRequest,{params}:{params:{id:string}}){
    let idCheck = parseInt(params.id)
    const token = req.headers.get("Authorization")?.replace("Bearer ", "");
  if (!token) {
    return NextResponse.json("Unauthorized", { status: 401 });
  }

  try {
    const decodedToken = verify(token, "secret-key");
    const user = decodedToken as JwtPayload;
    const idUser = user.idUser;
    const course = await prisma.courses.findUnique({
        where:{idCourse: idCheck},
        select:{titleCourse: true, price: true, image: true}
    })
    const getUser = await prisma.users.findUnique({
      where: {idUser: idUser},
      select:{username: true}
    })
    return NextResponse.json({getUser: getUser,course: course,message: "Tạo hóa đơn thành công" },{ status: 200})
  } catch (error) {
    console.error("Lỗi tạo hóa đơn:", error);
    return NextResponse.json("Internal Server Error", { status: 500 });
  }
}
// import { NextRequest,NextResponse } from "next/server";
// import { verify, JwtPayload } from "jsonwebtoken";
// import prisma from "@/prisma/client";
// import Stripe from "stripe";
// import { stripe } from "@/lib/stripe";

// export async function POST(req: NextRequest,{params}:{params:{id:string}}){
//     let idCheck = parseInt(params.id)
//     const token = req.headers.get("Authorization")?.replace("Bearer ", "");
//   if (!token) {
//     return NextResponse.json("Unauthorized", { status: 401 });
//   }

//   try {
//     const decodedToken = verify(token, "secret-key");
//     const user = decodedToken as JwtPayload;
//     const idUser = user.idUser;
//     const course = await prisma.courses.findUnique({
//         where:{idCourse: idCheck}
//     })
//     const findPurchase = await prisma.purchase.findFirst({
//         where:{idCourse: idCheck, idUser: idUser}
//     })
//     if(findPurchase){
//         return NextResponse.json({message: "Khóa học đã được mua"},{status: 400})
//     }
//     const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] = [{
//         quantity: 1,
//         price_data:{
//             currency: "VND",
//             product_data:{
//               name: course?.titleCourse!,
//               description: course?.introduce!,
//             },
//             unit_amount: Math.round(course?.price!),
//         }
//     }]
//     if(!findPurchase){
//         // const createPurchase = await prisma.purchase.create({
//         //   data:{
//         //     idCourse: idCheck,
//         //     idUser: idUser,
//         //     purchaseDate: new Date()
//         //   }
//         // })
//         // const createPayment = await prisma.payment.create({
//         //   data:{
//         //     idPurchase: createPurchase.idPurchase,
//         //     amount: course?.price,
//         //     paymentDate: new Date(),
//         //     paymentMethod: "Card"
//         //   }
//         // })
//         // const username = await prisma.users.findUnique({
//         //   where:{idUser: idUser}
//         // })
//         let customerPurchase = await prisma.purchase.findFirst({
//           where:{idUser: idUser},
//           select:{idCourse: true}
//         })
//         if(!customerPurchase){
//           const customer = await stripe.customers.create({
//             email: user.emailAddresses[0].emailAddresses,
//           })
//           customerPurchase = await prisma.purchase.create({
//             data:{
//               idUser: idUser,
//               idCourse: parseInt(customer.id),
//             }
//           })
//         }
//         const session = await stripe.checkout.sessions.create({
//           customer: customerPurchase.idCourse.toString(),
//           line_items,
//           mode: 'payment',
//           success_url: `${process.env.NEXT_PUBLIC_APP_URL}/courses/${course?.idCourse}?success=1`,
//           cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/courses/${course?.idCourse}?canceled=1`,
//           metadata:{
//             idCourse: course?.idCourse,
//             idUser: idUser
//           }
//         })
//     }
//     return NextResponse.json({message: "Mua thành công" },{ status: 200})
//   } catch (error) {
//     console.error("Lỗi lấy courses:", error);
//     return NextResponse.json("Internal Server Error", { status: 500 });
//   }
// }