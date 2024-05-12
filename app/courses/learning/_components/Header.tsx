import React from "react";
import Link from "next/link";
import { IoIosArrowRoundForward } from "react-icons/io";
import { useParams } from "next/navigation";
import { useCoursesStore } from "@/app/lib/hooks/useCoursesStore";

const Header = ({ completedPercentage }:any) => {
  const { id } = useParams();
  const idCourse = Array.isArray(id) ? parseInt(id[0]) : parseInt(id as string);
  const course = useCoursesStore.getState().getCourseById(idCourse)[0];
  return (
    <header className="fixed top-0 left-0 w-full bg-gray-800 text-white p-2 z-1">
      <h1 className="text-2xl font-bold">{course?.titleCourse}</h1>
      <span className="text-green-600">
        Đã hoàn thành {completedPercentage} %
      </span>
      <div className="p-2 flex">
        <Link
          href={`/mycourse`}
          className="flex absolute right-0 top-[15px] mr-14 hover:bg-accent hover:text-accent-foreground text-sm font-medium py-3 px-4 rounded-lg focus:outline-none focus:shadow-outline mb-2"
        >
          Khóa học của tôi
          <span>
            <IoIosArrowRoundForward className="ml-2" size={22} />
          </span>
        </Link>
      </div>
    </header>
  );
};

export default Header;