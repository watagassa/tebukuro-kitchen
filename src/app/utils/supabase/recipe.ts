import { Recipe } from "@/app/types";
import { supabase } from "../supabase";

const fetchedIds: number[] = [];

export const Homefetcher_SWR_NEW = async (key: string): Promise<Recipe[]> => {
  // console.log(`fetcher key: ${key}`);

  //keyは`${kw}-${materialKey}-${pageIndex}`の形式
  //kwは検索キーワード
  //materialKeyは表示管理用の一意のキー:指定することで、複数のキーでdataを保存可能．fetther関数で使うことはない
  //pageIndexはページ番号：supabaseのrange関数で使う

  const kw = key.split("-")[1];
  // console.log("fetcher kw", kw);
  // console.log("fetcher kwType", typeof kw);
  if (kw === "") {
    const { data, error } = await supabase.rpc("get_random_recipes_exclude", {
      count: 10,
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
  } else {
    const { data, error } = await supabase.rpc(
      "get_random_recipes_keyword_exclude",
      {
        count: 10,
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
};
