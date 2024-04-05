"use client";
import { ColumnDef } from "@tanstack/react-table";
import { courses } from "@prisma/client";
import { ArrowUpDown, MoreHorizontal, Pencil, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {cn} from "@/lib/utils"

export const columns: ColumnDef<courses>[] = [
  {
    accessorKey: "titleCourse",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Tên khóa học
          <ArrowUpDown className="ml-1 h-3" />
        </Button>
      );
    },
  },
  {
    accessorKey: "price",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Giá
          <ArrowUpDown className="ml-1 h-3" />
        </Button>
      );
    },
    cell: ({ row }) => {
        const price = parseInt(row.getValue("price") || "0");
        const formartPrice= price !== 0 ? new Intl.NumberFormat("en-US",{
            style: "currency",
            currency: "VND"
        }).format(price) : "Free";

        return <div>{formartPrice}</div>;
      },
  },
  {
    accessorKey: "introduce",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Giới thiệu
          <ArrowUpDown className="ml-1 h-3" />
        </Button>
      );
    },
  },
  {
    accessorKey: "isPublic",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Trạng thái
          <ArrowUpDown className="ml-1 h-3" />
        </Button>
      );
    },
    cell: ({ row }) => {
        const isPub = row.getValue("isPublic") || false;
        return(
          <div className={cn("bg-slate-500 rounded-lg text-center p-1 w-[60%]", isPub && "bg-green-400")}>
              {isPub ? "Công khai" : "Không công khai"}
          </div>
        )
      },
  },
  {
    header: "Sửa đổi",
    id: "actions",
    cell: ({ row }) => {
      // const {id} = row.original;
      return (
        <div className="flex">
          <Link href={`/teacher/course/createCourse`}>
            <Pencil className="h-4 w-4 hover:text-green-500 ml-2" />
          </Link>
          <button>
            <Trash className="h-4 w-4 hover:text-red-500 ml-2" />
          </button>
        </div>
      );
    },
  },
];
