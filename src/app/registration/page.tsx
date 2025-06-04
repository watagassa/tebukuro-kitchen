"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { SubmitHandler } from "react-hook-form";
import { BiPlus } from "react-icons/bi";
import { TbCameraPlus } from "react-icons/tb";

import DescriptInputItem from "@/app/conponents/registration/DescriptInputItem";
import IngredientInputItem from "@/app/conponents/registration/IngredientInputItem";
import Footer from "@/app/conponents/Footer";
import { updateRecipeImage } from "@/app/utils/supabaseFncUpdate";
import {
  addRecipe,
  addSomeDescript,
  addSomeIngredient,
  compressImage,
  getImageUrl,
  uploadImage,
} from "@/app/utils/supabaseFunctionsNew";
import { RecipeSchemaType } from "@/app/validations/schema";
import { useRecipeFormTop } from "@/app/validations/useFormUtils";

export default function Registration() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    ingredientFieldArray,
    descriptFieldArray,
  } = useRecipeFormTop();

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file !== undefined) {
      const reader = new FileReader();
      reader.onload = () => setSelectedImage(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const onSubmit: SubmitHandler<RecipeSchemaType> = async (data) => {
    setLoading(true);
    const recipe_id = await addRecipe(data.recipe);

    if (recipe_id) {
      if (data.recipe.recipe_image) {
        const imagePath = `${recipe_id}/recipe.jpg`;
        const image = await compressImage(data.recipe.recipe_image); // 画像を圧縮
        await uploadImage(image, imagePath);
        const recipeImageUrl = await getImageUrl(imagePath);
        await updateRecipeImage(recipe_id, recipeImageUrl);
      }

      await addSomeDescript(recipe_id, data.descript);
      await addSomeIngredient(recipe_id, data.ingredient);
    }

    // window.alert("レシピが登録できました！");
    router.replace("/");
  };

  if (loading) {
    return <div>ロード中です</div>;
  }

  return (
    <div className="min-h-screen flex flex-col contain-paint bg-orange-primary text-black">
      <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
        <main className="p-4">
          <p className="text-center text-orange-700 font-semibold text-xl pt-4">
            レシピを登録
          </p>
          <div className="text-xs text-orange-600 mb-4 italic">
            <span className="text-red-500 font-bold">*</span> は必須項目です
          </div>

          {/* 画像アップロード */}
          <section className="bg-gray-100 h-56 w-9/12 mx-auto rounded-xl mt-4 mb-12 shadow-lg flex-col flex gap-y-4 justify-center items-center relative">
            {selectedImage ? (
              <>
                <Image
                  src={selectedImage}
                  alt=""
                  className="object-cover rounded-xl"
                  fill
                />
                <button
                  type="button"
                  className="w-6 h-6 rounded-full shadow-lg absolute top-0 right-0 bg-gray-400 m-2 flex justify-center items-center"
                  onClick={() => setSelectedImage(null)}
                >
                  <BiPlus className="rotate-45 text-2xl text-white" />
                </button>
              </>
            ) : (
              <>
                <TbCameraPlus className="text-gray-400 text-6xl" />
                <p className="text-gray-400">料理の写真を選択してください</p>
                <input
                  {...register("recipe.recipe_image")}
                  type="file"
                  accept="image/*"
                  className="absolute inset-0 opacity-0 cursor-pointer"
                  onChange={handleImageChange}
                />
              </>
            )}
            {/* zodのエラー文 */}
            <div className="text-red-500 text-sm">
              {errors.recipe?.recipe_image?.message}
            </div>
          </section>

          <section className="mb-4">
            <label htmlFor="recipe_name" className="text-orange-700 mb-2">
              タイトル<span className="text-red-500 ml-1">*</span>
            </label>
            <input
              {...register("recipe.recipe_name")}
              type="text"
              id="recipe_name"
              placeholder="基本のチャーハン"
              className="w-full p-2 border border-orange-200 h-10 rounded-md"
              autoCapitalize="off"
              autoCorrect="off"
            />
            <div className="text-red-500 text-sm">
              {errors.recipe?.recipe_name?.message}
            </div>
          </section>

          <section className="mb-3">
            <label htmlFor="recipe_comment" className="text-orange-700">
              説明
            </label>
            <textarea
              {...register("recipe.recipe_comment")}
              id="recipe_comment"
              className="w-full border border-orange-200 rounded-md p-2"
              placeholder="忙しい日でも簡単に作れる、香ばしい風味漂う絶品チャーハンです。"
              rows={3}
              autoCapitalize="off"
              autoCorrect="off"
            ></textarea>
            {/* zodのエラー文 */}
            <div className="text-red-500 text-sm">
              {errors.recipe?.recipe_comment?.message}
            </div>
          </section>

          <div className="flex gap-2 mb-6">
            <section className="flex-1">
              <label htmlFor="time" className="text-orange-700">
                調理時間
              </label>
              <input
                {...register("recipe.time")}
                type="text"
                id="time"
                placeholder="約10分"
                className="w-full p-2 border border-orange-200 rounded-md h-10"
                autoCapitalize="off"
                autoCorrect="off"
              />
              {/* zodのエラー文 */}
              <div className="text-red-500 text-sm">
                {errors.recipe?.time?.message}
              </div>
            </section>

            <section className="flex-1">
              <label htmlFor="how_many" className="text-orange-700">
                人数
              </label>
              <input
                {...register("recipe.how_many")}
                id="how_many"
                placeholder="2人分"
                className="w-full p-2 h-10 border border-orange-200 rounded-md"
                autoCapitalize="off"
                autoCorrect="off"
              />
              {/* zodのエラー文 */}
              <div className="text-red-500 text-sm">
                {errors.recipe?.how_many?.message}
              </div>
            </section>
          </div>

          <section className="mb-6">
            <p className="font-semibold text-orange-600 text-lg border-b border-orange-600">
              材料<span className="text-red-500 ml-1">*</span>
            </p>
            <IngredientInputItem
              errors={errors}
              register={register}
              fieldArray={ingredientFieldArray}
            />
          </section>

          <section>
            <p className="font-semibold text-orange-600 text-lg border-b border-orange-600">
              作り方
            </p>
            <DescriptInputItem
              errors={errors}
              register={register}
              fieldArray={descriptFieldArray}
            />
          </section>

          <button
            type="submit"
            className="flex justify-center text-white bg-orange-400 hover:bg-orange-400 font-semibold rounded-xl text-lg py-3 w-64 shadow-md mx-auto my-8"
          >
            レシピを登録する
          </button>
        </main>
        <div className="sticky bottom-0 w-full z-20">
          <Footer pathName="/registration" />
        </div>
      </form>
    </div>
  );
}
