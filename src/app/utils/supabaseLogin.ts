import { supabase } from "./supabase";
export const insertProfileIfNeeded = async () => {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  console.log("User :", user);
  if (!user) return;

  // すでに存在するか確認
  const { data: existingProfile } = await supabase
    .from("profiles")
    .select("id")
    .eq("id", user.id)
    .single();

  if (!existingProfile) {
    await supabase.from("profiles").insert({
      user_id: user.id,
      name: user.user_metadata.full_name,
      avatar_url: user.user_metadata.avatar_url,
    });
  }
};

export const signInWithGoogle = async () => {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
  });
  if (error) {
    console.error("Error logging in:", error);
  } else {
    insertProfileIfNeeded();
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
