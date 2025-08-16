import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { supabase } from "./app/utils/supabase";

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const hasToken = request.cookies.getAll().some((c) =>
    // sb-＜何文字でもOK＞-auth-token か sb-*-auth-token.数字 のいずれかにマッチ
    /^sb-[^-]+-auth-token(?:\.\d+)?$/.test(c.name),
  );
  const protectedPaths = ["/edit", "/users", "/registration", "/favorites"];
  const isProtected = protectedPaths.some((p) => path.endsWith(p));

  console.log("Path:", path);
  console.log("User:", hasToken);
  if (isProtected && !hasToken) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("callbackUrl", request.nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }

  // 認可チェック: /users/edit/[recipe_id]
  const match = path.match(/^\/users\/edit\/(\d+)/); // recipe_id が数字の場合
  if (match) {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    const recipeId = Number(match[1]);
    // if (!user) {
    //   // ユーザーがログインしていない場合はリダイレクト
    //   return NextResponse.redirect(new URL("/404", request.url));
    // }
    const { data: recipe, error } = await supabase
      .from("recipes")
      .select("user_id")
      .eq("id", recipeId)
      .single();

    if (error || !recipe || recipe.user_id !== user?.id) {
      // ユーザーIDが一致しなければリダイレクト（または403ページなど）
      //return NextResponse.redirect(new URL("/403", request.url)); // 403ページがあればそちらに
    }
  }
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/edit/:path*",
    "/users/:path*",
    "/registration/:path*",
    "/favorites/:path*",
  ],
};
