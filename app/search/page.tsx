"use client";
import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import HeaderNav from "../components/HeaderNav";
import Footer from "../components/Footer";
import Link from "next/link";
import Image from "next/image";
import useSWR from "swr";
import { useCoursesStore } from "../lib/hooks/useCoursesStore";

interface TeacherData {
  courseId: number;
  teacherName: string | null;
}

const fetchSearch = async (url:any) => {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Failed to fetch posts");
  }

  return response.json();
};

const SearchPage = () => {
  const search = useSearchParams();
  const searchTerm = search ? search.get("title") : null;
  const [teacherNames, setTeacherNames] = useState<TeacherData[]>([]);
  const { isLoadingCourses, courses, fetchDataCourses } = useCoursesStore();

  const encodeSearchTerm = encodeURI(searchTerm || "");

  const { data, isLoading } = useSWR(
    `/api/students/search?title=${encodeSearchTerm}`,
    fetchSearch,
    { revalidateOnFocus: false }
  );

  useEffect(() => {
    const fetchTeacherNames = async () => {
      const teacherNamesData: TeacherData[] = [];
      for (const course of courses) {
        const teacherName = await useCoursesStore
          .getState()
          .getTeacherUsername(course.teacherId);
        teacherNamesData.push({ courseId: course.idCourse, teacherName });
      }
      setTeacherNames(teacherNamesData);
    };

    fetchTeacherNames();
  }, [courses]);

  if (!searchTerm) {
    return (
      <>
        <div className="sticky top-0 z-10">
          <HeaderNav />
        </div>
        <div className="h-full pt-20 mx-2 border-b ml-3">
          <div className="flex justify-center items-center h-[478px] my-10 font-bold text-xl">
            <p>Vui lòng nhập nội dung tìm kiếm!</p>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <div className="sticky top-0 z-10">
        <HeaderNav />
      </div>
      <div className="h-full pt-20 mx-2 border-b ml-3">
        <h1 className="px-3 text-2xl font-bold mb-6 mt-4">
          {data && data.length > 0 && "Kết quả tìm kiếm:"}
        </h1>
        {data && data.length > 0 ? (
          <div className="flex flex-wrap">
            {data.map((result:any) => (
              <Link
                key={result.idCourse}
                href={`../courses/course/${result.idCourse}`}
                legacyBehavior
              >
                <div className="w-full lg:w-1/3 md:w-1/2 px-3 mb-10">
                  <div className="flex flex-col bg-white shadow-md hover:shadow-lg rounded-lg overflow-hidden hover:cursor-pointer hover:bg-white hover:shadow-black/75 transition-all">
                    <Image
                        width={279}
                        height={157}
                        src={result.image}
                        alt="Hình"
                        className="w-full h-40 object-cover"
                      />
                    <div className="p-4">
                      <h2 className="text-xl font-semibold mb-2">
                        {result.titleCourse}
                      </h2>
                      <p className="text-gray-700">
                        Bởi :{" "}
                        <span className="font-bold text-lg">
                          {teacherNames.find(
                            (item) => item.courseId === result.idCourse
                          )?.teacherName || ""}
                        </span>
                      </p>
                      <span className="text-gray-700 font-bold">
                        {result.price == 0 ? "Free" : `₫ ${result.price}`}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="flex justify-center items-center my-10 font-bold text-xl h-[478px]">
            <p>Không có kết quả tìm kiếm ! </p>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default SearchPage;