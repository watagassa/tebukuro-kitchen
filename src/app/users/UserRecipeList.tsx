"use client";

import { useEffect, useState } from "react";
import { Recipe } from "../types";
import { getAllUserRecipes } from "../utils/supabaseFunctionsNew";
import UserRecipeItem from "./UserRecipeItem";
import { getAllUserRecipesByID } from "../utils/supabase/recipe";

type MyRecipeListProps = {
  user_id?: number;
};

const UserRecipeList = ({ user_id }: MyRecipeListProps) => {
  const [userRecipe, setUserRecipe] = useState<Recipe[]>([]);
  useEffect(() => {
    if (!user_id) {
      const getUserRecipes = async () => {
        const recipe = await getAllUserRecipes();
        setUserRecipe(recipe);
      };
      getUserRecipes();
    } else {
      const getUserRecipesByID = async () => {
        const recipe = await getAllUserRecipesByID(user_id);
        setUserRecipe(recipe);
      };
      getUserRecipesByID();
    }
  }, [user_id]);

  return (
    <section className="bg-white rounded-xl mx-2 max-h-[36rem] overflow-y-scroll">
      {userRecipe != undefined ? (
        <>
          {userRecipe.map((recipe: Recipe) => (
            <UserRecipeItem
              user_id={user_id}
              key={recipe.id}
              id={recipe.id}
              name={recipe.name}
              image_url={recipe.image_url}
            />
          ))}
          <p className="flex justify-center font-semibold p-8 text-gray-400">
            保存されたレシピは以上です
          </p>
        </>
      ) : (
        <p className="flex justify-center font-semibold p-8 text-gray-400">
          レシピがありません。
        </p>
      )}
    </section>
  );
};

export default UserRecipeList;
