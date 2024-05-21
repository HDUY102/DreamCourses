import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";

export async function GET(request:NextRequest) {
  try {
    const searchQuery = request.url.split("?")[1]?.split("=")[1];

    if (!searchQuery) {
      return new NextResponse(
        JSON.stringify({ message: "Vui lòng nhập nội dung tìm kiếm" }),
        { status: 400 }
      );
    }

    const searchWords = decodeURIComponent(searchQuery).split(" ");

    const validSearchWords = searchWords.filter((word) => word.trim() !== "");

    if (validSearchWords.length === 0) {
      return new NextResponse(
        JSON.stringify({ message: "Vui lòng nhập từ khóa hợp lệ" }),
        { status: 400 }
      );
    }

    const allCourses = await prisma.courses.findMany({where:{isPublished:true}});

    const regexes = validSearchWords.map((word) => new RegExp(word, "i"));

    const searchResults = allCourses.filter((course) =>
      regexes.every((regex) => regex.test(course.titleCourse))
    );

    if (searchResults.length === 0) {
      return new NextResponse(
        JSON.stringify({ message: "Không có kết quả tìm kiếm" }),
        { status: 404 }
      );
    }

    return new NextResponse(JSON.stringify(searchResults), { status: 200 });
  } catch (error) {
    console.error("Lỗi:", error);
    return new NextResponse(
      JSON.stringify({ message: "Lỗi 500" }),
      { status: 500 }
    );
  }
}