import { Dispatch, SetStateAction } from "react";
import { Descript, Ingredient, Recipe } from "../types";
import { DescriptType, IngredientType, RecipeType } from "./typesUnion";

// 簡単にsetRecipeできる関数 入れたい値,入れたい要素,入れたいuseStateで動作
// レシピの値が変えれる
// setRecipe((prev) => ({ ...prev, name: state }));で割と簡単に変えれるのでこの関数を使うことはないかも？
export const FncRecipeSet = (
  state: string,
  recipeType: RecipeType,
  setRecipe: Dispatch<SetStateAction<Recipe>>,
) => {
  switch (recipeType) {
    case "id":
      break;
    case "name":
      setRecipe((prev) => ({ ...prev, name: state }));
      break;
    case "image_url":
      setRecipe((prev) => ({ ...prev, image_url: state }));
      break;
    case "time":
      setRecipe((prev) => ({ ...prev, time: state }));
      break;
    case "comment":
      setRecipe((prev) => ({ ...prev, comment: state }));
      break;
    case "howmany":
      setRecipe((prev) => ({ ...prev, howmany: state }));
      break;
    default:
      break;
  }
};

export const FncIngredientSet = (
  state: string | number,
  recipeType: IngredientType,
  setIngredient: Dispatch<SetStateAction<Ingredient>>,
) => {
  typeof state === "number"
    ? setIngredient((prev) => ({ ...prev, recipe_id: state }))
    : recipeType === "name"
      ? setIngredient((prev) => ({ ...prev, name: state }))
      : setIngredient((prev) => ({ ...prev, amount: state }));
};
export const FncDescriptSet = (
  state: string | number,
  recipeType: DescriptType,
  setIngredient: Dispatch<SetStateAction<Descript>>,
) => {
  typeof state === "number"
    ? setIngredient((prev) => ({ ...prev, recipe_id: state }))
    : recipeType === "image_url"
      ? setIngredient((prev) => ({ ...prev, image_url: state }))
      : setIngredient((prev) => ({ ...prev, text: state }));
};
