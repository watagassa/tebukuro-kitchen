"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

import { SubmitHandler } from "react-hook-form";
import { useSwipeable } from "react-swipeable";

import { FaPen } from "react-icons/fa";
import { BiCamera, BiCameraOff, BiPlus } from "react-icons/bi";
import { WiTime4 } from "react-icons/wi";

import DescriptInputItem from "@/app/conponents/registration/DescriptInputItem";
import IngredientInputItem from "@/app/conponents/registration/IngredientInputItem";
import Footer from "@/app/conponents/Footer";
import { inputDescript, InputIngredient } from "@/app/types";
import { getFileExtension } from "@/app/utils/fileUtils";
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

const Registration = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [inputDescripts, setInputDescripts] = useState<inputDescript[]>([
    { image: undefined, text: "" },
    { image: undefined, text: "" },
  ]);
  const [inputIngredients, setInputIngredients] = useState<InputIngredient[]>([
    { name: "", amount: "" },
    { name: "", amount: "" },
  ]);
  const [showFooter, setshowFooter] = useState(true);
  const [loading, setLoading] = useState(false);
  const handlers = useSwipeable({
    onSwipedUp: () => setshowFooter(false),
    onSwipedDown: () => setshowFooter(true),
    delta: 10,
  });
  const router = useRouter();
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
    if (recipe_id !== undefined) {
      if (data.recipe.recipe_image !== undefined) {
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
    router.replace(`/${recipe_id}`);
    return true;
  };
  const { register, handleSubmit, errors } = useRecipeFormTop();

  useEffect(() => {
    return () => {
      console.log(errors);
    };
  }, [errors]);

  if (loading) {
    return <div>ロード中です</div>;
  }

  return (
    <div
      {...handlers}
      className="min-h-screen flex flex-col contain-paint bg-[#FFFBF4] text-black"
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <main className="pr-4 pl-4">
            <p className="text-center font-semibold text-lg pt-4">
              レシピを登録
            </p>
            <section className="bg-gray-100 h-56 w-9/12 mx-auto rounded-xl mt-4 mb-12 shadow-lg flex-col flex gap-y-4 justify-center items-center relative">
              {selectedImage ? (
                <>
                  <Image
                    src={selectedImage}
                    alt=""
                    className="w-full h-full object-cover rounded-xl"
                    fill
                  />
                  <button
                    type="button"
                    title="a"
                    className="w-6 h-6 rounded-full shadow-lg absolute top-0 right-0 bg-gray-400 m-2 flex justify-center items-center"
                  >
                    <BiPlus className="rotate-45 text-2xl text-white" />
                  </button>
                </>
              ) : (
                <>
                  <BiCameraOff className="text-gray-400 text-6xl" />
                  <p className="text-gray-400">料理の写真を選択してください</p>
                </>
              )}
              <div className="absolute right-[-16px] bottom-[-16px]">
                <button
                  type="button"
                  title="b"
                  className="w-12 h-12 rounded-full shadow-lg bg-white flex justify-center items-center"
                >
                  <BiCamera className="text-2xl" style={{ color: "orange" }} />
                </button>
                <input
                  {...register("recipe.recipe_image")}
                  title="料理の写真"
                  type="file"
                  accept="image/*"
                  className="absolute inset-0 opacity-0 cursor-pointer"
                  onChange={handleImageChange}
                />
              </div>
            </section>
            {/* zodのエラー文 */}
            <div className="text-red-500">
              {errors.recipe?.recipe_image?.message}
            </div>
            <section className="items-center border-b border-gray-400 bg-[#FEF9EC]">
              <section className="items-center  border-gray-400 bg-[#FEF9EC]">
                <section className="flex">
                  <FaPen className="ml-3 text-gray-400 text-2xl" />
                  <input
                    {...register("recipe.recipe_name")}
                    type="text"
                    name="recipe.recipe_name"
                    id="recipe_name"
                    placeholder="タイトル /例  基本のチャーハン"
                    style={{ height: "40px", outline: "none" }}
                    className="w-full bg-[#FEF9EC] pl-3"
                  />
                </section>
                <div className="text-red-500">
                  {errors.recipe?.recipe_name?.message}
                </div>
              </section>
            </section>
            <section
              className="items-center w-1/5 border-b border-gray-400 bg-[#FEF9EC] mt-3"
              style={{ width: "200px" }}
            >
              <section className="flex">
                <WiTime4 className="my-auto text-gray-400 text-2xl" />
                <input
                  {...register("recipe.time")}
                  type="text"
                  name="recipe.time"
                  id="time"
                  placeholder="調理時間  /例  約10分"
                  style={{ height: "40px", outline: "none" }}
                  className="pt-1 bg-[#FEF9EC] pl-2"
                />
              </section>
              {/* zodのエラー文 */}
              <div className="text-red-500">{errors.recipe?.time?.message}</div>
            </section>
            <section>
              <div className="relative inline-block">
                <Image
                  className="py-4 pl-1 translate-y-4"
                  alt={""}
                  src="/Vector.png"
                  height={30}
                  width={80}
                />
                <p
                  className="absolute inset-0 flex items-center justify-center font-semibold translate-y-4 text-gray-600"
                  style={{ left: "-16px" }}
                >
                  材料
                </p>
              </div>

              <div className="items-center border-b border-gray-400 bg-[#FEF9EC] mt-3">
                <input
                  {...register("recipe.how_many")}
                  name="recipe.how_many"
                  id="people"
                  placeholder="人数  /例  2人分"
                  style={{
                    backgroundColor: "#FEF9EC",
                    height: "40px",
                    outline: "none",
                  }}
                  className="w-full pl-3"
                />
                {/* zodのエラー文 */}
                <div className="text-red-500">
                  {errors.recipe?.how_many?.message}
                </div>
              </div>
              <IngredientInputItem
                errors={errors}
                register={register}
                inputs={inputIngredients}
                setInputs={setInputIngredients}
              />
            </section>

            <section className="mx-4">
              <p className="font-semibold text-lg pb-1 mb-3 border-b border-black mt-4">
                作り方
              </p>
              <DescriptInputItem
                errors={errors}
                register={register}
                inputItems={inputDescripts}
                setInputItems={setInputDescripts}
              />
            </section>
            <section className="mx-4">
              <p className="font-semibold text-lg pb-1 mb-3 border-b border-black mt-4">
                料理の紹介
              </p>
              <textarea
                {...register("recipe.recipe_comment")}
                title="料理の紹介"
                name="recipe.recipe_comment"
                id="comment"
                className="w-full border border-gray-500 outline-none"
                style={{ outline: "none" }}
                rows={4}
              ></textarea>
            </section>
            {/* zodのエラー文 */}
            <div className="text-red-500">
              {errors.recipe?.recipe_comment?.message}
            </div>
            <button
              type="submit"
              className="flex justify-center text-white bg-orange-400 hover:bg-orange-400 font-semibold rounded-xl text-lg py-3 w-64 shadow-md mx-auto mt-8"
            >
              レシピを登録する
            </button>
            <div className="bg-[#FFFBF4] w-full h-8"></div>
          </main>
          <div
            className={`sticky bottom-0 w-full z-20 transition-transform duration-200 ${
              showFooter ? "translate-y-0" : "translate-y-full"
            }`}
          >
            <Footer pathName="/registration" />
          </div>
        </div>
      </form>
    </div>
  );
};

export default Registration;
