import { supabase } from "./supabase";
import { frontProfile } from "../types";
import { UUID } from "crypto";

export const addProfile = async () => {
  const {
    data: { user },
  } = await supabase.auth.getUser();

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
      console.log("プロフィール追加成功");
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
      console.log("プロフィール更新成功");
    }
  }
};

// Googleログイン
export const signInWithGoogle = async () => {
  const searchParams = new URLSearchParams(window.location.search);
  const callbackUrl = searchParams.get("callbackUrl") || "/";

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: `${
        location.origin
      }/auth/callback?callbackUrl=${encodeURIComponent(callbackUrl)}`,
    },
  });
  if (error) {
    console.error("Error logging in:", error);
  } else {
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

// idよりユーザープロフィール取得
export const getProfileByID = async (id: number) => {
  const profile = await supabase
    .from("profiles")
    .select("*")
    .eq("id", id)
    .single();
  if (profile.error) {
    console.error("supabaseエラー", profile.error);
  }
  // profilesとして認識させる
  const frontProfile: frontProfile = {
    name: profile.data.name,
    avatar_url: profile.data.avatar_url,
  };
  return frontProfile;
};

export const exchangeIDtoUUID = async (id: number) => {
  const { data, error } = await supabase
    .from("profiles")
    .select("user_id")
    .eq("id", id)
    .single();
  if (error) {
    console.error("supabaseエラー", error);
    return null;
  }
  return data.user_id as UUID;
};

export const getMyProfile = async () => {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { name: "ゲスト", avatar_url: "/thumbnail.png" };

  const { data: profile, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("user_id", user.id)
    .single();

  if (error || !profile) {
    console.error("プロフィールの取得に失敗しました", error);
    return;
  }

  const profileData: frontProfile = {
    name: profile.name,
    avatar_url: profile.avatar_url,
  };

  return profileData;
};
