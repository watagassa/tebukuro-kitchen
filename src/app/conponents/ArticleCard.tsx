"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import { FiCameraOff } from "react-icons/fi";

import { Recipe } from "@/app/types";

type ArticleCardProps = {
  recipe: Recipe;
  from?: string;
};

const ArticleCard = ({ recipe, from }: ArticleCardProps) => {
  const [imageError, setImageError] = useState(false);

  return (
    <Link
      href={`/${recipe.id}${from ? `?from=${from}` : ""}`}
      className="border-[0.1px] border-gray-400 rounded-[32px] bg-white"
    >
      <figure className="relative rounded-t-[32px] overflow-hidden aspect-[6/5] flex justify-center items-center bg-gray-100">
        {recipe.image_url && !imageError ? (
          <Image
            src={recipe.image_url}
            alt={recipe.name}
            fill
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
            className="rounded-t-[32px] object-cover"
            onError={() => setImageError(true)}
          />
        ) : (
          <FiCameraOff size={30} stroke="#737373" />
        )}
      </figure>

      <p className="min-h-11 rounded-b-lg font-semibold text-sm pt-2 text-black flex justify-center">
        {recipe.name}
      </p>
    </Link>
  );
};

export default ArticleCard;
