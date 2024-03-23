"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "@/app/adminn/sidebar/menuLink/MenuLink.module.css";
import React from "react";

const MenuLink = ({ item }) => {
  const pathname = usePathname();
  return (
    <Link
      href={item.path}
      className={`${styles.container} `}
    >
      {item.icon}
      {item.title}
    </Link>
  );
};

export default MenuLink;