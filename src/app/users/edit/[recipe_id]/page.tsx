"use client";
import { useState, useEffect } from "react";
import Image from "next/image";

// import { BiBookmark } from "react-icons/bi";
import { SubmitHandler } from "react-hook-form";
import { useSwipeable } from "react-swipeable";
import { FaPen } from "react-icons/fa";
import { BiCamera, BiCameraOff, BiPlus } from "react-icons/bi";
// import Link from "next/link";
import DescriptInputItem from "./DescriptInputItem";
import IngredientInputItem from "./IngredientInputItem";
import Footer from "@/app/conponents/Footer";
import { inputDescript, InputIngredient } from "../../../types";
import { updateRecipeImage } from "../../../utils/supabaseFncUpdate";
import {
  compressImage,
  getImageUrl,
  updateImage,
  updateRecipe,
  updateSomeDescript,
  updateSomeIngredient,
} from "../../../utils/supabaseFunctionsNew";
import { RecipeSchemaType } from "../../../validations/schema";
import { useRecipeFormTop } from "../../../validations/useFormUtils";
import { useRouter } from "next/navigation";
import {
  getRecipesbyId,
  getByIngredientId,
  getByDescriptId,
} from "../../../utils/supabaseFunctionsNew";

const Edit = ({ params }: { params: { recipe_id: number } }) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [inputIngredients, setInputIngredients] = useState<InputIngredient[]>([
    { name: "", amount: "" },
    { name: "", amount: "" },
  ]);
  const [inputDescripts, setInputDescripts] = useState<inputDescript[]>([
    { image: undefined, text: "" },
    { image: undefined, text: "" },
  ]);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useRecipeFormTop();

  useEffect(() => {
    const init = async () => {
      const recipe = await getRecipesbyId(params.recipe_id);
      const ingredients = await getByIngredientId(params.recipe_id);
      const descripts = await getByDescriptId(params.recipe_id);

      setValue("recipe.recipe_name", recipe[0].name);
      setValue(
        "recipe.time",
        recipe[0].time != undefined ? recipe[0].time : "",
      );
      setValue(
        "recipe.how_many",
        recipe[0].howmany != undefined ? recipe[0].howmany : "",
      );
      setValue(
        "recipe.recipe_comment",
        recipe[0].comment != undefined ? recipe[0].comment : "",
      );

      setSelectedImage(
        recipe[0].image_url != undefined ? recipe[0].image_url : "",
      );

      const ingData: InputIngredient[] = [];
      ingredients.map((ing) => {
        ingData.push({ name: ing.name, amount: ing.amount });
      });
      setInputIngredients(ingData);

      const descData: inputDescript[] = [];
      descripts.map((desc) => {
        descData.push({
          image: desc.image_url != undefined ? desc.image_url : "",
          text: desc.text,
        });
      });
      setInputDescripts(descData);
    };
    init();
  }, [params.recipe_id, setValue]);

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
    await updateRecipe(params.recipe_id, data.recipe);
    if (params.recipe_id !== undefined) {
      if (data.recipe.recipe_image !== undefined) {
        const imagePath = `${params.recipe_id}/recipe.jpg`;
        const image = await compressImage(data.recipe.recipe_image);
        await updateImage(image, imagePath);
        const recipeImageUrl = await getImageUrl(imagePath);
        await updateRecipeImage(params.recipe_id, recipeImageUrl);
      }
      await updateSomeDescript(params.recipe_id, data.descript);
      await updateSomeIngredient(params.recipe_id, data.ingredient);
    }

    router.replace(`/users`);
    return true;
  };

  useEffect(() => {
    return () => {
      console.log(errors);
    };
  }, [errors]);

  return (
    <div
      {...handlers}
      className="flex min-h-screen flex-col bg-[#FFFBF4] text-black contain-paint"
    >
      {loading === false ? (
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <main className="pl-4 pr-4">
              <p className="pt-4 text-center text-lg font-semibold">
                レシピを編集
              </p>
              <section className="relative mx-auto mb-12 mt-10 flex h-56 w-9/12 flex-col items-center justify-center gap-y-4 rounded-xl bg-gray-100 shadow-lg">
                {selectedImage ? (
                  <>
                    <Image
                      src={selectedImage}
                      alt=""
                      className="h-full w-full rounded-xl object-cover"
                      fill
                    />
                    <button
                      type="button"
                      title="a"
                      className="absolute right-0 top-0 m-2 flex h-6 w-6 items-center justify-center rounded-full bg-gray-400 shadow-lg"
                    >
                      <BiPlus className="rotate-45 text-2xl text-white" />
                    </button>
                  </>
                ) : (
                  <>
                    <BiCameraOff className="text-6xl text-gray-400" />
                    <p className="text-gray-400">
                      料理の写真を選択してください
                    </p>
                  </>
                )}
                <div className="absolute bottom-[-16px] right-[-16px]">
                  <button
                    type="button"
                    title="b"
                    className="flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-lg"
                  >
                    <BiCamera
                      className="text-2xl"
                      style={{ color: "orange" }}
                    />
                  </button>
                  <input
                    {...register("recipe.recipe_image")}
                    title="料理の写真"
                    type="file"
                    accept="image/*"
                    className="absolute inset-0 cursor-pointer opacity-0"
                    onChange={handleImageChange}
                  />
                </div>
              </section>
              {/* zodのエラー文 */}
              <div className="text-red-500">
                {errors.recipe?.recipe_image?.message}
              </div>
              <section className="items-center border-b border-gray-400 bg-[#FEF9EC]">
                <section className="items-center border-gray-400 bg-[#FEF9EC]">
                  <section className="flex">
                    <FaPen className="ml-3 text-2xl text-gray-400" />
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
                className="mt-3 w-1/5 items-center border-b border-gray-400 bg-[#FEF9EC]"
                style={{ width: "200px" }}
              >
                <section className="flex">
                  <FaPen className="ml-3 text-2xl text-gray-400" />
                  <input
                    {...register("recipe.time")}
                    type="text"
                    name="recipe.time"
                    id="time"
                    placeholder="時間  /例  約10分"
                    style={{ height: "40px", outline: "none" }}
                    className="bg-[#FEF9EC] pl-2 pt-1"
                  />
                </section>
                {/* zodのエラー文 */}
                <div className="text-red-500">
                  {errors.recipe?.time?.message}
                </div>
              </section>
              <section>
                <div className="relative inline-block">
                  <Image
                    className="translate-y-4 py-4 pl-1"
                    alt={""}
                    src="/Vector.png"
                    height={30}
                    width={80}
                  />
                  <p
                    className="absolute inset-0 flex translate-y-4 items-center justify-center font-semibold text-gray-600"
                    style={{ left: "-16px" }}
                  >
                    材料
                  </p>
                </div>

                <div className="mt-3 items-center border-b border-gray-400 bg-[#FEF9EC]">
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
                  setValue={setValue}
                />
              </section>

              <section className="mx-4">
                <p className="mb-3 mt-4 border-b border-black pb-1 text-lg font-semibold">
                  作り方
                </p>
                <DescriptInputItem
                  errors={errors}
                  register={register}
                  inputItems={inputDescripts}
                  setInputItems={setInputDescripts}
                  setValue={setValue}
                />
              </section>
              <section className="mx-4">
                <p className="mb-3 mt-4 border-b border-black pb-1 text-lg font-semibold">
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
                className="mx-auto mt-8 flex w-64 justify-center rounded-xl bg-orange-400 py-3 text-lg font-semibold text-white shadow-md hover:bg-orange-400"
              >
                レシピを保存する
              </button>
              <div className="h-8 w-full bg-[#FFFBF4]"></div>
            </main>
            <div
              className={`sticky bottom-0 z-20 w-full transition-transform duration-200 ${
                showFooter ? "translate-y-0" : "translate-y-full"
              }`}
            >
              <Footer pathName="/users" />
            </div>
          </div>
        </form>
      ) : (
        <div>ロード中です</div>
      )}
    </div>
  );
};

export default Edit;
