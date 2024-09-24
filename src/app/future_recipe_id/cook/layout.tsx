"use client";

import "@/app/globals.css";
import { FaArrowLeft } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa";
import { IoMicOutline } from "react-icons/io5";
import RecipeHeader from "@/app/conponents/RecipeHeader";

export default function CookLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-white">
        <RecipeHeader
          bgColor="bg-orange-400"
          textColor="text-white"
          title="基本のチャーハン"
          link=""
        />
        {children}
        <div className="bg-orange-400 w-full fixed bottom-0 h-14 flex justify-center">
          <div className="w-full flex justify-between">
            <FaArrowLeft className="mt-1 mx-5 w-8 h-8" />
            <FaArrowRight className="mt-1 mx-5 w-8 h-8" />
          </div>
          <div className="absolute -top-10 bg-orange-400 w-24 h-24 rounded-full flex justify-center">
            <IoMicOutline className="relative w-12 h-12 top-6" />
          </div>
        </div>
      </body>
    </html>
  );
}
