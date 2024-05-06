import React from "react";

const Footer = () => {
  return (
    <div className="p-4 text-center text-gray-400 border-t-2 border-solid">
      <i>
        Dream <span className="text-emerald-500 ">Courses</span>
      </i>{" "}
      &copy; {new Date().getFullYear()} Accompany your dreams
    </div>
  );
};

export default Footer;