import prisma from "@/prisma/client";
import { NextResponse } from "next/server";

export async function GET() {
  const countStudents = await prisma.users.count({
    where: { roleId: 2 },
  });
  const countTeachers = await prisma.users.count({
    where: { roleId: 3 },
  });
  const people = countStudents + countTeachers;
  const revenue = people * 50000;
  const countCourses = await prisma.courses.count();
  const revenueChart = await prisma.$queryRaw`
  SELECT MONTH(dateCreate) as monthCreate, count(idUser) as count FROM users WHERE roleId != 1 GROUP BY monthCreate`
  if(Array.isArray(revenueChart)){
    revenueChart.forEach((revenueObject: any) => {
        revenueObject.count = Number(revenueObject.count)*50000;
    });
  }
  return NextResponse.json(
    {
      "Tổng học viên: ": countStudents,
      "Tổng số giảng viên: ": countTeachers,
      "Tổng số khóa học: ": countCourses,
      "Tổng doanh thu: ": revenue,
      "Biểu đồ doanh thu: ": revenueChart,
    },
    { status: 200 }
  );
}
