import { Recipe } from "../types";
import { supabase } from "../utils/supabase";
import {
  getAllUserRecipesByID,
  getAllUserRecipesByUUID,
} from "../utils/supabase/recipe";

export type pageElements = {
  user_id: string; //ユーザーID
  profile: {
    //プロフィール情報
    name: string; //ユーザー名
    avatar_url: string; //アバター画像のURL
  };
  created_recipes: Recipe[]; //作成したレシピの配列
};

export const getMyPage = async () => {
  const {
    data: { user },
    error: idError,
  } = await supabase.auth.getUser();
  if (!user) throw idError;
  const user_id: pageElements["user_id"] = user.id;

  try {
    const { data: profileData, error: profileError } = await supabase
      .from("profiles")
      .select("*")
      .eq("user_id", user_id)
      .single();
    if (profileError || !profileData)
      throw profileError || new Error("取得したプロフィール情報が空です");
    const profile: pageElements["profile"] = {
      name: profileData.name,
      avatar_url: profileData.avatar_url,
    };

    const created_recipes = await getAllUserRecipesByUUID(user_id);

    return { user_id, profile, created_recipes } as pageElements;
  } catch (error) {
    throw new Error(
      `マイページの取得に失敗しました: ${error instanceof Error ? error.message : "不明なエラー"}`,
    );
  }
};

export const getOtherUserPage = async (user_id: string) => {
  try {
    const id = Number(user_id);
    const { data: profileData, error: profileError } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", id)
      .single();
    if (profileError || !profileData)
      throw profileError || new Error("取得したプロフィール情報が空です");
    const profile: pageElements["profile"] = {
      name: profileData.name,
      avatar_url: profileData.avatar_url,
    };

    const created_recipes = await getAllUserRecipesByID(user_id);

    return { user_id, profile, created_recipes } as pageElements;
  } catch (error) {
    throw new Error(
      `ユーザーページの取得に失敗しました: ${error instanceof Error ? error.message : "不明なエラー"}`,
    );
  }
};
