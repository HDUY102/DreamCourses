"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaShoppingCart } from "react-icons/fa";

interface ButtonProps{
    courseId: number
}

export const PurchaseButton = ({courseId}: ButtonProps) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const onClick = async () =>{
    router.push(`/payment/${courseId}`)
  }
  return (
    <Button size="sm" className="h-[25px]" onClick={onClick} disabled={isLoading}>
      <FaShoppingCart size={20} className="mr-2" />
      Mua
    </Button>
  );
};
