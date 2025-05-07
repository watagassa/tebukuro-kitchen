import { UUID } from "crypto";
import { supabase } from "./supabase";
import { profiles } from "../types";
export const addProfile = async () => {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  console.log("User :", user);
  if (!user) return;

  const profileData = {
    user_id: user.id,
    name: user.user_metadata.full_name,
    avatar_url: user.user_metadata.avatar_url,
  };
  // すでに存在するか確認
  const { data: existingProfile } = await supabase
    .from("profiles")
    .select("user_id")
    .eq("user_id", user.id)
    .single();

  if (!existingProfile) {
    const userData = await supabase.from("profiles").insert({
      user_id: user.id,
      name: profileData.name,
      avatar_url: profileData.avatar_url,
    });
    if (userData.error) {
      console.error("supabaseエラー", userData.error);
    } else {
      console.log("User profile created:", userData.data);
    }
  } else {
    const userData = await supabase
      .from("profiles")
      .update({
        name: profileData.name,
        avatar_url: profileData.avatar_url,
      })
      .eq("user_id", user.id); // ← "id" は primary key（user_id じゃなく）
    if (userData.error) {
      console.error("supabaseエラー", userData.error);
    } else {
      console.log("User profile update:", userData.data);
    }
  }
};

// Googleログイン
export const signInWithGoogle = async () => {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
  });
  if (error) {
    console.error("Error logging in:", error);
  } else {
    addProfile();
    console.log("User logged in:", data);
  }
};
export const isLoggedIn = async (): Promise<boolean> => {
  const {
    data: { session },
    error,
  } = await supabase.auth.getSession();
  if (error) {
    console.error("セッション取得エラー:", error.message);
    return false;
  }

  return !!session?.user;
};

export const logout = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) {
    console.error("ログアウトに失敗しました:", error.message);
  } else {
    console.log("ログアウト成功");
  }
};

// UUIDよりユーザープロフィール取得
export const getProfileByID = async (user_id: UUID) => {
  const recipe = await supabase
    .from("profiles")
    .select("*")
    .eq("user_id", user_id)
    .single();
  if (recipe.error) {
    console.error("supabaseエラー", recipe.error);
  }
  // profilesとして認識させる
  return recipe.data as profiles;
};
