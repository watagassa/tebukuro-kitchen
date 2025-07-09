import { Recipe } from "@/app/types";
import { supabase } from "../supabase";
import { exchangeIDtoUUID } from "../supabaseLogin";
import { getCurrentUserID } from "../supabaseFunctionsNew";

const ramdomFetchedIds: number[] = [];
const searchFetchedIds: number[] = [];
let favoriteFetchedIds: number[] = [];
let searchFavFeatchedIds: number[] = [];

export const free_favoriteFetchedId=()=>favoriteFetchedIds = [];
export const free_searchFavFeatchedIds=()=>searchFavFeatchedIds = [];

export const randomFetcher = async()=>{
  const {data,error } = await supabase.rpc("get_random_recipes_exclude", {
    count: 10,
    exclude_ids: ramdomFetchedIds, // 取得済みID
  });
  if (error) throw error;
  if (data) {
    const newIds = data.map((r: Recipe) => r.id);
    ramdomFetchedIds.push(...newIds);
  }
  return data ?? ([] as Recipe[]);
}

export const searchFeatcher = async(key : string)=>{
  const kw = key.substring(key.indexOf("-") + 1, key.lastIndexOf("-"));
  const { data ,error } = await supabase.rpc("get_random_recipes_exclude", {
    count: 10,
    exclude_ids: searchFetchedIds, // 取得済みID
    keyword: kw,
  });
  if (error) throw error;
  if (data) {
    const newIds = data.map((r: Recipe) => r.id);
    searchFetchedIds.push(...newIds);
  }
  if(error) throw error;
  return data ?? ([] as Recipe[]);
}

export const favoriteFetcher = async (): Promise<Recipe[]> => {
  const { data, error } = await supabase.rpc("get_favorite_recipes_by_uuid", {
    count: 10,
    exclude_ids: favoriteFetchedIds, // 取得済みID
    target_user_id: await getCurrentUserID(),
  });
  if (data) {
    const newIds = data.map((r: Recipe) => r.id);
    favoriteFetchedIds.push(...newIds);
  }
  if (error) console.error(error);
  return data ?? ([] as Recipe[]);
};

export const searchFavFeatcher = async (key: string): Promise<Recipe[]> => {
  const kw = key.substring(key.indexOf("-") + 1, key.lastIndexOf("-"));
  const { data, error } = await supabase.rpc("get_favorite_recipes_by_uuid", {
    count: 10,
    exclude_ids: searchFavFeatchedIds, // 取得済みID
    target_user_id: await getCurrentUserID(),
    keyword: kw,
  });
  if (data) {
    const newIds = data.map((r: Recipe) => r.id);
    searchFavFeatchedIds.push(...newIds);
  }
  if (error) console.error(error);
  return data ?? ([] as Recipe[]);
};

// const fetchedIds: number[] = [];

// export const Homefetcher_SWR_NEW = async (key: string): Promise<Recipe[]> => {
//   // console.log(`fetcher key: ${key}`);

//   //keyは`${kw}-${materialKey}-${pageIndex}`の形式
//   //kwは検索キーワード
//   //materialKeyは表示管理用の一意のキー:指定することで、複数のキーでdataを保存可能．fetther関数で使うことはない
//   //pageIndexはページ番号：supabaseのrange関数で使う

//   const kw = key.split("-")[1];
//   // console.log("fetcher kw", kw);
//   // console.log("fetcher kwType", typeof kw);
//   if (kw === "") {
//     const { data, error } = await supabase.rpc("get_random_recipes_exclude", {
//       count: 10,
//       exclude_ids: fetchedIds, // 取得済みID
//     });

//     if (error) throw error;
//     if (data) {
//       const newIds = data.map((r: Recipe) => r.id);
//       fetchedIds.push(...newIds);
//       console.log("fetchedIds", fetchedIds);
//       console.log("data", data);
//     }
//     return data ?? ([] as Recipe[]);
//   } else {
//     const { data, error } = await supabase.rpc(
//       "get_random_recipes_keyword_exclude",
//       {
//         count: 10,
//         exclude_ids: fetchedIds, // 取得済みID
//         keyword: kw,
//       }
//     );
//     if (data) {
//       const newIds = data.map((r: Recipe) => r.id);
//       fetchedIds.push(...newIds);
//       console.log("fetchedIds", fetchedIds);
//       console.log("data", data);
//     }
//     //簡単な部分一致検索(参考:https://zenn.dev/417/scraps/b494b081c2c33b)
//     if (error) console.error(error);
//     return data ?? ([] as Recipe[]);
//   }
// };

// export const FavoriteFetcher_SWR_NEW = async (
//   key: string
// ): Promise<Recipe[]> => {
//   const kw = key.split("-")[1];
//   // keywordが空文字や無い場合はバックで条件なしで取得するようにしている
//   const { data, error } = await supabase.rpc("get_favorite_recipes_by_uuid", {
//     count: 10,
//     exclude_ids: fetchedIds, // 取得済みID
//     target_user_id: await getCurrentUserID(),
//     keyword: kw,
//   });
//   if (data) {
//     const newIds = data.map((r: Recipe) => r.id);
//     fetchedIds.push(...newIds);
//     console.log("fetchedIds", fetchedIds);
//     console.log("data", data);
//   }
//   //簡単な部分一致検索(参考:https://zenn.dev/417/scraps/b494b081c2c33b)
//   if (error) console.error(error);
//   return data ?? ([] as Recipe[]);
// };

export const getAllUserRecipesByID = async (user_id: number) => {
  const user_UUID = await exchangeIDtoUUID(user_id);
  if (!user_UUID) {
    console.error("ユーザーのUUIDが取得できませんでした");
    return [] as Recipe[];
  }
  const recipes = await supabase
    .from("recipes")
    .select("*")
    .eq("user_id", user_UUID);
  if (recipes.error) {
    console.error("ユーザーのレシピ取得中にエラー", recipes.error);
  }
  return recipes.data as Recipe[];
};
