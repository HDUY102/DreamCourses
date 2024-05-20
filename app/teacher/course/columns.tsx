"use client";
import { ColumnDef } from "@tanstack/react-table";
import { courses } from "@prisma/client";
import { ArrowUpDown, Pencil, Trash, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {cn} from "@/lib/utils"
import ConfirmDelete from "@/app/components/ConfirmDelete";
import { useState } from "react";
import { toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
    accessorKey: "isPublished",
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
        const isPub = row.getValue("isPublished") || false;
        return(
          <div className={cn("bg-black rounded-lg text-center text-white p-1 w-[60%]", isPub && "bg-green-400 text-black")}>
              {isPub ? "Công khai" : "Không công khai"}
          </div>
        )
      },
  },
  {
    header: "Sửa đổi",
    id: "actions",
    cell: ({ row }  ) => {
      const [isLoading, setLoading] = useState(false);
      const notify:any = () => toast("Xóa khóa học thành công!",{
        icon: <Trash className='text-red-500'/>,
        position: "top-right",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      const notifyErrorDel:any = () => toast("Đã có người học, không cho xóa!",{
        icon: <X className='text-red-500'/>,
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });

      const onDelete = async () =>{
        try{
          const courseId = row.original.idCourse;
          setLoading(true)
          const response = await fetch(`http://localhost:3000/api/courses/${courseId}`, {
            method: 'DELETE',
          });
          const data = await response.json();
          if (data.message === "Đã có người học, không cho xóa!") {
            notifyErrorDel();
            return;
          }

          if (response.ok) {
            notify()
            setTimeout(() => {
              window.location.reload();
            }, 3000);
          } else {
            toast.error("Lỗi, xin thử lại");
          }
        }catch{
          setLoading(false)
        }
      }
      return (
        <div className="flex">
          <Link href={`/teacher/course/updateCourse/${row.original.idCourse}`}>
            <Pencil className="h-4 w-4 hover:text-green-500 ml-2" />
          </Link>
          <ConfirmDelete onConfirmDel={onDelete}>
            <button disabled={isLoading}>
              <Trash className="h-4 w-4 hover:text-red-500 ml-2" />
            </button>
          </ConfirmDelete>
          <ToastContainer />
        </div>
      );
    },
  },
];
