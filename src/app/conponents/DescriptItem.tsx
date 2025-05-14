"use client";

import Image from "next/image";
import { useState } from "react";

import { FiCameraOff } from "react-icons/fi";

import { Descript } from "@/app/types";

const DescriptItem = ({ id, text, image_url }: Descript) => {
  const [imageError, setImageError] = useState(false);

  return (
    <li className="bg-white flex items-start justify-between p-1">
      <div className="flex-shrink-0">
        <p className="bg-orange-400 text-white size-4 flex items-center justify-center font-semibold text-xs rounded-sm">
          {id}
        </p>
      </div>
      <p className="pt-2 px-4 font-semibold text-xs break-words max-w-[calc(100%-90px)]">
        {text}
      </p>

      {image_url && !imageError ? (
        <div className="relative size-[72px]">
          <Image
            src={image_url}
            alt={text || "作り方画像"}
            fill
            className="my-auto object-cover"
            onError={() => setImageError(true)}
          />
        </div>
      ) : (
        <div className="bg-gray-100 p-6">
          <FiCameraOff size={24} stroke="#737373" />
        </div>
      )}
    </li>
  );
};

export default DescriptItem;
