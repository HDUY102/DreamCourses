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

    // Chia từ khóa tìm kiếm thành các từ riêng biệt
    const searchWords = decodeURIComponent(searchQuery).split(" ");

    // Loại bỏ từ rỗng hoặc chỉ chứa dấu cách
    const validSearchWords = searchWords.filter((word) => word.trim() !== "");

    if (validSearchWords.length === 0) {
      return new NextResponse(
        JSON.stringify({ message: "Vui lòng nhập từ khóa hợp lệ" }),
        { status: 400 }
      );
    }

    const allCourses = await prisma.courses.findMany({where:{isPublished:true}});

    // Tạo một biểu thức chính quy cho mỗi từ tìm kiếm
    const regexes = validSearchWords.map((word) => new RegExp(word, "i"));

    // Lọc danh sách khóa học bằng biểu thức chính quy
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