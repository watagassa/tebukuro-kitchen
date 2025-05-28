"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

import { useInView } from "react-intersection-observer";
import { FiCameraOff } from "react-icons/fi";
import { WiTime4 } from "react-icons/wi";
import { IoIosArrowBack } from "react-icons/io";
import { PiMicrophoneBold } from "react-icons/pi";

import RecipeHeader from "@/app/conponents/RecipeHeader";
import Footer from "@/app/conponents/Footer";
import FavoriteButton from "@/app/conponents/FavoriteButton";
import IngredientItem from "@/app/conponents/IngredientItem";
import DescriptItem from "@/app/conponents/DescriptItem";
import LoadingDataFetch from "@/app/conponents/LoadingDataFetch";
import { Descript, DetailRecipe, Ingredient } from "@/app/types";
import { getDetailRecipebyId } from "@/app/utils/supabaseFunctionsNew";

export default function RecipeId({
  params,
  searchParams,
}: {
  params: { recipe_id: number };
  searchParams: { from?: string };
}) {
  const from = searchParams?.from || "/";
  const [list, setList] = useState<DetailRecipe>();
  const { ref, inView } = useInView({
    threshold: 0,
  });

  useEffect(() => {
    const getDetailRecipe = async () => {
      const detailRecipe = await getDetailRecipebyId(params.recipe_id);
      setList(detailRecipe);
    };
    getDetailRecipe();
  }, [params.recipe_id]);

  if (!list) {
    return (
      <div className="flex justify-center items-center bg-orange-primary h-screen">
        <LoadingDataFetch />
      </div>
    );
  }
  return (
    <div className="bg-orange-primary contain-paint">
      {!inView && (
        <RecipeHeader
          bgColor="bg-white"
          textColor="text-black"
          title={list.name}
          link={from === "favorites" ? "/favorites" : "/"}
          iconFill="black"
        />
      )}

      <main className="pb-10 min-h-[calc(100vh-150px)] ">
        <figure className="flex justify-center items-center border-b border-gray-400 shadow-md aspect-[3/2] bg-gray-100 relative">
          {inView && (
            <Link
              href={from === "favorites" ? "/favorites" : "/"}
              className="absolute top-4 left-4 text-3xl z-10 bg-white rounded-full p-1 shadow-lg cursor-pointer flex items-center justify-center"
            >
              <IoIosArrowBack />
            </Link>
          )}
          {/* nullのみを判定しているので、url先の画像が見つからない場合に対処できない */}
          {list.image_url ? (
            <Image
              src={list.image_url}
              alt={list.name}
              sizes="100vw"
              fill
              className="object-cover"
              onError={() => console.error("Image failed to load")}
            />
          ) : (
            <FiCameraOff size={40} stroke="#737373" />
          )}
        </figure>

        <div className="m-4 pb-2">
          <div className="flex justify-between gap-2">
            <div>
              <p ref={ref} className="text-2xl font-semibold text-orange-700">
                {list.name}
              </p>
              <div className="flex items-center gap-2 mt-2">
                <Image
                  src={list.profiles.avatar_url}
                  alt={list.profiles.name}
                  width={32}
                  height={32}
                  className="rounded-full"
                  onError={() => console.error("Image failed to load")}
                />
                <p>{list.profiles.name}</p>
              </div>
            </div>
            <FavoriteButton
              recipe={{
                id: list.id,
                name: list.name,
                image_url: list.image_url,
                time: list.time,
                comment: list.comment,
                howmany: list.howmany,
              }}
            />
          </div>

          {list.time && (
            <div className="inline-flex items-center gap-1 rounded-full bg-orange-100 min-h-6 px-2 max-w h-auto mt-3">
              <WiTime4 className="size-4 text-orange-500 shrink-0" />
              <p className="text-xs text-orange-700 break-words">{list.time}</p>
            </div>
          )}

          {list.comment && (
            <p className="text-sm text-gray-600 pt-3">{list.comment}</p>
          )}
        </div>

        <div className="lg:flex items-start text-black">
          <section className="pb-7 flex-1 lg:max-w-md mx-4">
            <div className="font-semibold text-lg text-orange-600  pb-1 border-b border-orange-600">
              {list.howmany ? <p>材料（{list.howmany}）</p> : <p>材料</p>}
            </div>
            <div className="border-orange-200 border mt-4 rounded-xl bg-orange-secondary divide-y divide-dashed divide-neutral-400">
              {list.ingredients.map((ingredient: Ingredient) => (
                <IngredientItem
                  key={ingredient.id}
                  id={ingredient.id}
                  name={ingredient.name}
                  amount={ingredient.amount}
                  recipe_id={ingredient.recipe_id}
                />
              ))}
            </div>
          </section>

          <section className="mx-4 flex-1">
            <p className="font-semibold text-lg text-orange-600 pb-1 mb-4 border-b border-orange-600">
              作り方
            </p>
            <div className="space-y-3">
              {list.descripts.map((descript: Descript, index) => (
                <DescriptItem
                  key={descript.id}
                  id={index + 1}
                  text={descript.text}
                  image_url={descript.image_url}
                  recipe_id={descript.recipe_id}
                />
              ))}
            </div>
          </section>
        </div>

        <Link
          href={`./${params.recipe_id}/cook${
            from === "favorites" ? "?from=favorites" : ""
          }`}
          className="flex justify-center items-center gap-1 text-white bg-orange-400 hover:bg-orange-500 font-semibold rounded-xl py-3 w-64 shadow-md mx-auto mt-8"
        >
          <PiMicrophoneBold className="size-[18px]" />
          調理を開始する
        </Link>
      </main>
      <div className="sticky bottom-0">
        <Footer pathName="/" />
      </div>
    </div>
  );
}
