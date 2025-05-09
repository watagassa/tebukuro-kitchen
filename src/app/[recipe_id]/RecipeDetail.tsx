"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import { FiCameraOff } from "react-icons/fi";
import { WiTime4 } from "react-icons/wi";
import { useSwipeable } from "react-swipeable";

import RecipeHeader from "@/app/conponents/RecipeHeader";
import Footer from "@/app/conponents/Footer";
import DescriptItem from "@/app/conponents/DescriptItem";
import IngredientItem from "@/app/conponents/IngredientItem";
import FavoriteButton from "@/app/conponents/FavoriteButton";
import { Descript, DetailRecipe, Ingredient } from "@/app/types";

export default function RecipeId({
  detailRecipe,
  params,
  searchParams,
}: {
  detailRecipe: DetailRecipe;
  params: { recipe_id: number };
  searchParams: { from?: string };
}) {
  const from = searchParams?.from || "/";
  const [showFooter, setshowFooter] = useState(true);
  const [imageError, setImageError] = useState(false);

  //スクロールを検知する
  const handlers = useSwipeable({
    onSwipedUp: () => setshowFooter(false),
    onSwipedDown: () => setshowFooter(true),
    delta: 60,
  });

  return (
    <div {...handlers} className="bg-[#FFFBF4] contain-paint">
      <title>{`${detailRecipe.name} | てぶくろキッチン`}</title>
      <RecipeHeader
        bgColor="bg-white"
        textColor="text-black"
        title={detailRecipe.name}
        link={from === "favorites" ? "/favorites" : "/"}
        iconFill="black"
      />

      <main className="pb-10 min-h-[calc(100vh-150px)] ">
        <figure className="flex justify-center items-center border-b border-gray-400 shadow-md aspect-[3/2] bg-gray-100 relative">
          {detailRecipe.image_url && !imageError ? (
            <Image
              src={detailRecipe.image_url}
              alt={detailRecipe.name}
              sizes="100vw"
              fill
              className="object-cover"
              onError={() => setImageError(true)}
            />
          ) : (
            <FiCameraOff size={40} stroke="#737373" />
          )}
        </figure>

        <section className="border-b border-gray-300 m-4 pb-4">
          <div className="flex justify-between gap-2">
            <div>
              <p className="text-2xl font-semibold text-[#815B2C]">
                {detailRecipe.name}
              </p>
              <p className="text-sm pt-1">by 田中太郎さん</p>
            </div>
            <FavoriteButton
              recipe={{
                id: detailRecipe.id,
                name: detailRecipe.name,
                image_url: detailRecipe.image_url,
                time: detailRecipe.time,
                comment: detailRecipe.comment,
                howmany: detailRecipe.howmany,
              }}
            />
          </div>

          {detailRecipe.time && (
            <div className="flex items-center py-2 gap-2 text-black">
              <WiTime4 fill="#fa003f" className="size-8" />
              {detailRecipe.time}
            </div>
          )}

          {detailRecipe.comment && (
            <p className="text-sm font-semibold text-[#565656] pt-3">
              {detailRecipe.comment}
            </p>
          )}
        </section>

        <div className="lg:flex items-start text-black">
          <section className="pt-1 pb-8 flex-1 lg:max-w-md">
            <div className="bg-[#F9DEDC] font-semibold text-sm px-4 py-2">
              <p>材料{detailRecipe.howmany && `（${detailRecipe.howmany}）`}</p>
            </div>
            <ul>
              {detailRecipe.ingredients.map((ingredient: Ingredient) => (
                <IngredientItem
                  key={ingredient.id}
                  id={ingredient.id}
                  name={ingredient.name}
                  amount={ingredient.amount}
                  recipe_id={ingredient.recipe_id}
                />
              ))}
            </ul>
          </section>

          <section className="mx-4 flex-1">
            <p className="font-semibold text-lg pb-1 mb-3 border-b border-black">
              作り方
            </p>
            <ol className="space-y-1">
              {detailRecipe.descripts.map((descript: Descript, index) => (
                <DescriptItem
                  key={descript.id}
                  id={index + 1}
                  text={descript.text}
                  image_url={descript.image_url}
                  recipe_id={descript.recipe_id}
                />
              ))}
            </ol>
          </section>
        </div>

        <Link
          href={`./${params.recipe_id}/cook${
            from === "favorites" ? "?from=favorites" : ""
          }`}
          className="flex justify-center text-white bg-orange-400 hover:bg-orange-500 font-semibold rounded-xl text-lg py-3 w-64 shadow-md mx-auto mt-8"
        >
          つくる
        </Link>
      </main>
      <div
        className={`sticky bottom-0 w-full z-20 transition-transform duration-200 ${
          showFooter ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <Footer pathName="/" />
      </div>
    </div>
  );
}
