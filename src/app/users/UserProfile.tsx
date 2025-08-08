"use client";
import Image from "next/image";
import React from "react";

const UserProfile = (profaile: { name: string; avatar: string }) => {
  return (
    <div className="flex gap-x-3">
      <div className="relative size-16 shrink-0">
        <Image
          src={profaile.avatar}
          alt="avatar_image"
          fill
          className="rounded-full object-cover"
        />
      </div>
      <div className="my-auto font-semibold">
        <p className="pb-1 text-xl text-black">{profaile.name}</p>
        {/* <p className="text-xs text-[#797575]">@1124awerq</p> */}
      </div>
    </div>
  );
};

export default UserProfile;
