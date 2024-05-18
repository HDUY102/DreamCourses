import prisma from "@/prisma/client";
import { NextResponse } from "next/server";
import { verify, JwtPayload } from "jsonwebtoken";

type RevenueChartObject = {
    month: number;
    count: number;
    revenue: number;
  };

export async function GET(request: NextResponse) {
  const token = request.headers.get("Authorization")?.replace("Bearer ", "");
  if (!token) {
    return NextResponse.json("Unauthorized", { status: 401 });
  }
  const decodedToken = verify(token, "secret-key");
  const user = decodedToken as JwtPayload;
  const idUser = user.idUser;
  const countCourses = await prisma.courses.findMany({
    where: { teacherId: idUser},
  });
  const courseIds  = countCourses.map((course:any)=> course.idCourse)
  const countStudents = await prisma.courseuser.count({
    where: {
        courseId: {in: courseIds },
    },
  });
  const totalRevenue = await prisma.courseuser.findMany({
    where: {
      courseId: { in: courseIds },
    },
    include: {
      courses: {
        select: {
          price: true,
        },
      },
    },
  });
  const revenue = totalRevenue.reduce((acc, curr) => acc + curr.courses.price, 0);
  const revenueChart = await prisma.$queryRaw`
    SELECT MONTH(cu.dateRegistered) as monthRegistered, count(cu.userId) as count,SUM(c.price) as totalRevenue
        FROM courseuser cu
        JOIN courses c ON cu.courseId = c.idCourse
        WHERE  c.teacherId = ${idUser}
        GROUP BY monthRegistered`;
    let formattedRevenueChart: RevenueChartObject[] = [];
  if (Array.isArray(revenueChart)) {
    formattedRevenueChart = revenueChart.map((revenueObject: any) => ({
        month: revenueObject.monthRegistered,
        count: Number(revenueObject.count),
        revenue: Number(revenueObject.totalRevenue),
      }));
  }
  return NextResponse.json(
    {
      "Tổng học viên: ": countStudents,
      "Tổng số khóa học: ": countCourses.length,
      "Tổng doanh thu: ": revenue,
      "Biểu đồ doanh thu: ": formattedRevenueChart,
    },
    { status: 200 }
  );
}
