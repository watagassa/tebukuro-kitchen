"use client";

import { useRouter } from "next/navigation";
import { IoIosArrowBack } from "react-icons/io";

type UserHeaderProps = {
  showBack?: boolean;
};

const UserHeader = ({ showBack }: UserHeaderProps) => {
  const router = useRouter();

  return (
    <header className="sticky z-40 flex w-full items-center justify-center border-b border-gray-400 bg-orange-400 p-5 shadow-md">
      {showBack && (
        <button
          onClick={() => router.back()}
          className="absolute left-5 text-3xl"
        >
          <IoIosArrowBack fill="white" />
        </button>
      )}
      <p className="flex-1 truncate text-balance pl-10 pr-11 text-center text-xl font-semibold text-white">
        マイページ
      </p>
    </header>
  );
};

export default UserHeader;
