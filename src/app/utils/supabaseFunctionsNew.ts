import { PostgrestSingleResponse } from "@supabase/supabase-js";
import { Descript, DetailRecipe, Ingredient, Recipe } from "../types";
import { supabase } from "../utils/supabase";
import { getFileExtension } from "./fileUtils";
import { arrayShuffle } from "./supabaseFncUpdate";
import {
  DescriptSchemaType,
  IngredientSchemaType,
  RecipeObjectSchemaType,
} from "../validations/schema";
import { Dispatch, SetStateAction } from "react";
// 全レシピ取得
export const getAllRecipes = async () => {
  const recipes = await supabase.from("recipes").select("*");
  if (recipes.error) {
    console.error("supabaseエラー", recipes.error);
  }
  // 強制的にRecipe[]として認識させる
  return recipes.data as Recipe[];
};
export const getAllUserRecipes = async () => {
  const recipes = await supabase
    .from("recipes")
    .select("*")
    .eq("user_id", await getCurrentUserID());
  if (recipes.error) {
    console.error("ユーザーのレシピ取得中にエラー", recipes.error);
  }
  return recipes.data as Recipe[];
};
// // 全レシピランダム取得
export const getAllRandomRecipes = async () => {
  const recipes = await supabase.from("recipes").select("*");
  if (recipes.data !== null) {
    return arrayShuffle(recipes.data) as Recipe[];
  }
  if (recipes.error) {
    console.error("supabaseエラー", recipes.error);
  }
  // 強制的にRecipe[]として認識させる
  return [] as Recipe[];
};
const PAGE_SIZE = 10;
export const getPageRecipes = async (
  pageNumber: number,
  pageRecipe: Recipe[],
  setPageRecipe: Dispatch<SetStateAction<Recipe[]>>,
  setAllRecipesRetrieved: Dispatch<SetStateAction<boolean>>
) => {
  const recipes = await supabase
    .from("recipes")
    .select("*")
    .range((pageNumber - 1) * PAGE_SIZE, pageNumber * PAGE_SIZE - 1);
  // if (recipes.data !== null) {
  //     recipes.data = arrayShuffle(recipes.data) as Recipe[];
  // }
  if (recipes.error) {
    console.error("supabaseエラー", recipes.error);
  } else {
    if (recipes.data.length !== PAGE_SIZE) {
      // もしレシピが全部取れていたならtrueをセット
      setAllRecipesRetrieved(true);
    }
  }
  setPageRecipe([...pageRecipe, ...(recipes.data as Recipe[])] as Recipe[]);
};

// レシピのidより1つのレシピ取得
export const getRecipesbyId = async (id: number) => {
  const recipe = await supabase.from("recipes").select("*").eq("id", id);
  if (recipe.error) {
    console.error("supabaseエラー", recipe.error);
  }
  // 強制的にRecipe[]として認識させる
  return recipe.data as Recipe[];
};
// レシピ作成
export const addRecipe = async (recipe: RecipeObjectSchemaType) => {
  const { data, error } = await supabase
    .from("recipes")
    .insert({
      name: recipe.recipe_name,
      image_url: recipe?.recipe_image,
      how_many: recipe?.how_many,
      time: recipe?.time,
      comment: recipe?.recipe_comment,
      user_id: await getCurrentUserID(),
    })
    .select(); // 挿入されたデータを取得するために select() を使用

  if (error) {
    console.error("Error inserting data:", error);
  } else {
    // 挿入されたデータのIDを取得
    return data[0].id as number;
  }
};
// レシピ削除
export const deleteRecipe = async (id: number) => {
  await supabase.from("recipes").delete().eq("id", id);
};
// レシピのidより材料取得
export const getByIngredientId = async (recipe_id: number) => {
  const ingredients: PostgrestSingleResponse<Ingredient[]> = await supabase
    .from("ingredients")
    .select("*")
    .eq("recipe_id", recipe_id);
  if (ingredients.data !== null) {
    ingredients.data.sort((firstItem: Ingredient, secondItem: Ingredient) => {
      if (firstItem.index !== undefined && secondItem.index !== undefined) {
        return firstItem.index - secondItem.index;
      } else {
        return -1;
      }
    });
  }
  if (ingredients.error) {
    console.error("supabaseエラー", ingredients.error);
  }
  return ingredients.data as Ingredient[];
};
// 材料作成
export const addIngredient = async (
  recipe_id: number,
  index: number,
  name: string,
  amount: string
) => {
  const { error } = await supabase
    .from("ingredients")
    .insert({
      recipe_id: recipe_id,
      index: index,
      name: name,
      amount: amount,
    })
    .select(); // 挿入されたデータを取得するために select() を使用
  if (error) {
    console.error("supabaseエラー", error);
  }
};
// 複数個の材料作成
export const addSomeIngredient = async (
  recipe_id: number,
  inputIngredients: IngredientSchemaType
) => {
  inputIngredients.forEach((e, index) => {
    addIngredient(recipe_id, index, e.name, e.amount);
  });
};
export const deleteIngredient = async (id: number) => {
  await supabase.from("ingredients").delete().eq("id", id);
};

// レシピのidより作り方取得
export const getByDescriptId = async (recipe_id: number) => {
  const descripts: PostgrestSingleResponse<Descript[]> = await supabase
    .from("descripts")
    .select("*")
    .eq("recipe_id", recipe_id);
  if (descripts.data !== null) {
    descripts.data.sort((firstItem: Descript, secondItem: Descript) => {
      if (firstItem.index !== undefined && secondItem.index !== undefined) {
        return firstItem.index - secondItem.index;
      } else {
        return -1;
      }
    });
  }
  if (descripts.error) {
    console.error("supabaseエラー", descripts.error);
  }
  return descripts.data as Descript[];
};
// 材料作成
export const addDescript = async (
  recipe_id: number,
  index: number,
  image_url?: string,
  text?: string
) => {
  await supabase.from("descripts").insert({
    recipe_id: recipe_id,
    index: index,
    image_url: image_url,
    text: text,
  });
};
// 複数個の作り方を作成
export const addSomeDescript = async (
  recipe_id: number,
  descripts: DescriptSchemaType
) => {
  descripts.map(async (e, index) => {
    if (e.image !== undefined) {
      const descriptExtension = getFileExtension(e.image);
      const descriptImagePath = `${recipe_id}/Descripts/${index}.${descriptExtension}`;
      await uploadImage(e.image, descriptImagePath);
      const image_url = await getImageUrl(descriptImagePath);
      console.log("image_url", image_url);
      // await addDescript(recipe_id,index, image_url, e.text);
      await addDescript(recipe_id, index, image_url, e.text);
    } else {
      await addDescript(recipe_id, index, undefined, e.text);
    }
  });
};
export const deleteDescripts = async (id: number) => {
  await supabase.from("descripts").delete().eq("id", id);
};

export const uploadImage = async (
  file: File,
  filePath: string
  // recipe_id: number
) => {
  const { error } = await supabase.storage
    .from("images")
    .upload(filePath, file);
  if (error) {
    console.error("supabaseエラー", error);
  }
};
// 画像名より画像のurl取得
export const getImageUrl = async (filePath: string) => {
  const { data } = supabase.storage.from("images").getPublicUrl(filePath);
  if (data === null) {
    console.error("画像が見つかりません");
    return "";
  }
  const imageUrl = data.publicUrl;
  return imageUrl;
};
// レシピのidより1つのレシピ詳細取得
export const getDetailRecipebyId = async (id: number) => {
  const detailRecipe: PostgrestSingleResponse<DetailRecipe> = await supabase
    .from("recipes")
    .select("*, descripts(*), ingredients(*)")
    .eq("id", id)
    .single();
  if (detailRecipe.error) {
    console.error("supabaseエラー", detailRecipe.error);
  }
  console.log(detailRecipe.data);
  if (detailRecipe.data?.descripts !== undefined) {
    detailRecipe.data?.descripts.sort(
      (firstItem: Descript, secondItem: Descript) => {
        // 数値の比較で安全なデフォルト値を設定
        const firstIndex = Number(firstItem.index ?? Number.MAX_SAFE_INTEGER);
        const secondIndex = Number(secondItem.index ?? Number.MAX_SAFE_INTEGER);

        console.log(firstIndex - secondIndex);
        return firstIndex - secondIndex;
      }
    );
  }
  console.log("sortDes", detailRecipe.data?.descripts);
  // sort
  if (detailRecipe.data?.ingredients !== undefined) {
    detailRecipe.data?.ingredients.sort(
      (firstItem: Ingredient, secondItem: Ingredient) => {
        const firstIndex = Number(firstItem.index ?? Number.MAX_SAFE_INTEGER);
        const secondIndex = Number(secondItem.index ?? Number.MAX_SAFE_INTEGER);
        console.log(firstIndex - secondIndex);
        return firstIndex - secondIndex;
      }
    );
    console.log("sortING", detailRecipe.data?.ingredients);
  }
  if (detailRecipe.error) {
    console.error("supabaseエラー", detailRecipe.error);
  }
  return detailRecipe.data as DetailRecipe;
};
// 現在のログインセッションのユーザーのIDを取得
export const getCurrentUserID = async () => {
  const userData = await supabase.auth.getUser();
  if (userData.error) {
    console.error("ユーザーID取得中にエラー", userData.error);
  }
  return userData.data.user?.id;
};
// favorites追加関数
export const addFavorites = async (recipe_id: number) => {
  const res = await supabase.from("favorites").insert({
    user_id: await getCurrentUserID(),
    recipe_id: recipe_id,
  });
  if (res.error) {
    console.error("favorites追加中にエラー", res.error);
  }
};
// favorites取得関数
export const getFavorites = async () => {
  const res = await supabase
    .from("favorites")
    .select("*")
    .eq("user_id", await getCurrentUserID());
  if (res.error) {
    console.error("favorites取得中にエラー", res.error);
  }
  return res.data;
};
// favorites登録判定関数
export const isFavorited = async (recipe_id: number) => {
  const res = await supabase
    .from("favorites")
    .select("recipe_id")
    .eq("recipe_id", recipe_id)
    .limit(1);
  if (res.error) {
    console.error("favorites登録判定中にエラー", res.error);
  }
  return res.data !== null && res.data.length > 0;
};
// favorites削除関数
export const deleteFavorites = async (recipe_id: number) => {
  await supabase.from("favorites").delete().eq("recipe_id", recipe_id);
};

// recipe, descripts, ingredientsをまとめて削除する関数
export const deleteRecipeDatas = async (recipe_id: number) => {
  await supabase.from("descripts").delete().eq("recipe_id", recipe_id);
  await supabase.from("ingredients").delete().eq("recipe_id", recipe_id);
  await deleteFavorites(recipe_id);
  await deleteRecipe(recipe_id);
};
