"use client"
import React, { useState } from "react";
import Link from "next/link";

const LessonPage = () => {
  return (
    <div className="relative flex justify-center mt-6 border bg-slate-100 rounded-md p-4">
      <Link href={"/teacher/lesson/createLesson"}>
        <button className="bg-sky-800 text-white rounded-lg mr-1 hover:text-white p-2 hover:bg-sky-600">
          Tạo Bài Học Mới
        </button>
      </Link>
    </div>
  );
};

export default LessonPage;
