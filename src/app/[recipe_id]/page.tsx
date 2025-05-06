"use client";

import DescriptItem from "@/app/conponents/DescriptItem";
import FavoriteButton from "@/app/conponents/FavoriteButton";
import Footer from "@/app/conponents/Footer";
import IngredientItem from "@/app/conponents/IngredientItem";
import RecipeHeader from "@/app/conponents/RecipeHeader";
import { Descript, DetailRecipe, Ingredient } from "@/app/types";
import { getDetailRecipebyId } from "@/app/utils/supabaseFunctionsNew";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FiCameraOff } from "react-icons/fi";
import { WiTime4 } from "react-icons/wi";
import LoadingDataFetch from "@/app/conponents/LoadingDataFetch";
import { useSwipeable } from "react-swipeable";

export default function RecipeId({
  params,
  searchParams,
}: {
  params: { recipe_id: number };
  searchParams: { from?: string };
}) {
  const [list, setList] = useState<DetailRecipe>();
  const from = searchParams?.from || "/";
  const [showFooter, setshowFooter] = useState(true);

  //スクロールを検知する
  const handlers = useSwipeable({
    onSwipedUp: () => setshowFooter(false),
    onSwipedDown: () => setshowFooter(true),
    delta: 60,
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
      <div className="flex justify-center items-center bg-[#FFFBF4] h-screen">
        <LoadingDataFetch />
      </div>
    );
  }
  return (
    <div {...handlers} className="bg-[#FFFBF4] contain-paint">
      <title>{`${list.name} | てぶくろキッチン`}</title>
      <RecipeHeader
        bgColor="bg-white"
        textColor="text-black"
        title={list.name}
        link={from === "favorites" ? "/favorites" : "/"}
        iconFill="black"
      />

      <main className="pb-10 min-h-[calc(100vh-150px)] ">
        <figure className="flex justify-center items-center border-b border-gray-400 shadow-md aspect-[3/2] bg-gray-100 relative">
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

        <div className="border-b border-gray-300 m-4 pb-4">
          <div className="flex justify-between gap-2">
            <div>
              <p className="text-2xl font-semibold text-[#815B2C]">
                {list.name}
              </p>
              <p className="text-sm pt-1">by 田中太郎さん</p>
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
            <div className="flex items-center py-2 gap-2 text-black">
              <WiTime4 fill="#fa003f" className="size-8" />
              {list.time}
            </div>
          )}

          {list.comment && (
            <p className="text-sm font-semibold text-[#565656] pt-3">
              {list.comment}
            </p>
          )}
        </div>

        <div className="lg:flex items-start text-black">
          <section className="pt-1 pb-8 flex-1 lg:max-w-md">
            <div className="bg-[#F9DEDC] font-semibold text-sm px-4 py-2">
              {list.howmany ? <p>材料（{list.howmany}）</p> : <p>材料</p>}
            </div>
            {list.ingredients.map((ingredient: Ingredient) => (
              <IngredientItem
                key={ingredient.id}
                id={ingredient.id}
                name={ingredient.name}
                amount={ingredient.amount}
                recipe_id={ingredient.recipe_id}
              />
            ))}
          </section>

          <section className="mx-4 flex-1">
            <p className="font-semibold text-lg pb-1 mb-3 border-b border-black">
              作り方
            </p>
            <div className="space-y-1">
              {list.descripts.map((descript: Descript, index) => (
                <DescriptItem
                  key={descript.id}
                  id={index + 1}
                  text={descript.text}
                  // image_url={`https://picsum.photos/${descript.id + 500}`}
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
        <Footer pathName="/registration" />
      </div>
    </div>
  );
}
