"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import logo from "@/app/img/logo.png";
import { FaSearch, FaShoppingCart } from "react-icons/fa";
import { useRouter } from "next/navigation";

const HeaderNav = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");
  const [userId, setUserId] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();

  useEffect(() => {
    // Check for token in session storage
    const token = sessionStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
      // Extract username from token
      const decodedToken = JSON.parse(atob(token.split(".")[1]));
      setUserName(decodedToken.Username);
      setUserId(decodedToken.idUser);
    }
  }, []);

  const handleLogout = async () => {
    try {
      const response = await fetch("/api/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        sessionStorage.removeItem("token");
        router.push("/login");
      } else {
        throw new Error("Logout failed");
      }
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const onSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const encodeSearchTerm = encodeURIComponent(searchTerm);
    router.push(`/search?title=${encodeSearchTerm}`);
  };

  return (
    <div>
      <header className="flex items-center justify-between bg-emerald-600 h-16 fixed w-full">
        <nav className="flex items-center gap-8 text-white font-semibold">
          <Link href={"/"}>
            <Image
              src={logo}
              width={75}
              height={15}
              className="p-2 ml-5 rounded-full"
              alt="LOGO"
            />
          </Link>
          <Link
            className="p-2 hover:bg-white hover:text-black rounded-full px-6"
            href="/"
          >
            Trang Chủ
          </Link>
          <Link
            className="p-2 hover:bg-white hover:text-black rounded-full px-6"
            href={"/about"}
          >
            Giới thiệu
          </Link>
          <form
            onSubmit={onSearch}
            className="bg-slate-100 p-2 rounded-lg flex items-center mx-10"
          >
            <input
              type="text"
              placeholder="Nhập tên khóa học"
              className="bg-transparent focus:outline-none w-24 sm:w-60 text-black"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button type="submit">
              <FaSearch className="text-slate-600" />
            </button>
          </form>
        </nav>
        <nav className="flex items-center gap-6 text-gray-500 font-semibold">
          {isLoggedIn ? (
            <>
              <Link
                className="text-white hover:text-black rounded-full px-2"
                href="/mycourse"
              >
                Khoá học của tôi
              </Link>
              <Link className="px-2" href="/cart">
                <FaShoppingCart className="text-white" size={21} />
              </Link>
              <button
                className="p-2 text-black bg-orange-500 rounded-full px-6 mr-3 hover:opacity-95 hover:text-white"
                onClick={handleLogout}
              >
                Đăng xuất
              </button>
            </>
          ) : (
            <>
              <Link className="px-2" href="/cart">
                <FaShoppingCart className="text-white" size={21} />
              </Link>
              <Link
                className="p-2 text-white hover:text-black rounded-full px-6"
                href="/login"
              >
                Đăng nhập
              </Link>
              <Link
                className="p-2 text-black bg-orange-500 rounded-full px-6 mr-3 hover:opacity-95 hover:text-white"
                href="/register"
              >
                Đăng ký
              </Link>
            </>
          )}
        </nav>
      </header>
    </div>
  );
};

export default HeaderNav;