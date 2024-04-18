"use client"
import React, { useState } from "react";
import Link from "next/link";

const ChapterPage = () => {
  return (
    <div className="relative mt-6 border bg-slate-100 rounded-md p-4">
      <div className="flex justify-center">
        <Link href={"/teacher/chapter/createChapter"}>
          <button className="bg-sky-800 text-white rounded-lg mr-1 hover:text-white p-2 hover:bg-sky-600">
            Tạo Chương
          </button>
        </Link>
      </div>
      
    </div>
  );
};

export default ChapterPage;
