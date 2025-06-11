import { Recipe } from "@/app/types";
import { supabase } from "../supabase";

const fetchedIds: number[] = [];
export const GET_RECIPE_SIZE = 10; // 1回の取得数

export const homeGetRecipes = async (key:string): Promise<Recipe[]> => {
  const {data,error} = await supabase.rpc("get_random_recipes_exclude",{
    count: GET_RECIPE_SIZE,
    exclude_ids: fetchedIds, // 取得済みID
  });
  if (error) throw error;
  if (data) {
    const newIds = data.map((r: Recipe) => r.id);
    fetchedIds.push(...newIds);
    console.log("fetchedIds", fetchedIds);
    console.log("data", data);
  }
  return data ?? ([] as Recipe[]);
}

export const homeGetRecipesKeyword = async (key: string): Promise<Recipe[]> => {
  const kw = key.substring(key.indexOf("-") + 1, key.lastIndexOf("-"));
  const { data, error } = await supabase.rpc("get_random_recipes_keyword_exclude",{
      count: GET_RECIPE_SIZE,
      exclude_ids: fetchedIds, // 取得済みID
      keyword: kw,
    }
  );
  if (data) {
    const newIds = data.map((r: Recipe) => r.id);
    fetchedIds.push(...newIds);
    console.log("fetchedIds", fetchedIds);
    console.log("data", data);
  }
  //簡単な部分一致検索(参考:https://zenn.dev/417/scraps/b494b081c2c33b)
  if (error) console.error(error);
  return data ?? ([] as Recipe[]);
}
