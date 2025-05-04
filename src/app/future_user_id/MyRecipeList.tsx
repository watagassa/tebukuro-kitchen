"use client";

import { useEffect, useState } from "react";
import MyRecipeItem from "./MyRecipeItem";
import { Recipe } from "../types";
import { getAllUserRecipes } from "../utils/supabaseFunctionsNew";
const MyRecipeList = () => {
  const [userRecipe, setUserRecipe] = useState<Recipe[]>([]);
  useEffect(() => {
    const getUserRecipes = async () => {
      const recipe = await getAllUserRecipes();
      setUserRecipe(recipe);
    };
    getUserRecipes();
  }, []);

  useEffect(() => {
    console.log(userRecipe);
  }, [userRecipe]);

  return (
    <section className="bg-white rounded-xl mx-2 max-h-[36rem] overflow-y-scroll">
      <MyRecipeItem />
      <p className="flex justify-center font-semibold p-8 text-gray-400">
        保存されたレシピは以上です
      </p>
    </section>
  );
};

export default MyRecipeList;
