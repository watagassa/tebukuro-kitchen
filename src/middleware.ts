import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  // サーバー用
  const cookieStore = await cookies();
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options),
            );
          } catch {
            // The `setAll` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing
            // user sessions.
          }
        },
      },
    },
  );

  const path = request.nextUrl.pathname;
  const hasToken = request.cookies.getAll().some((c) =>
    // sb-＜何文字でもOK＞-auth-token か sb-*-auth-token.数字 のいずれかにマッチ
    /^sb-[^-]+-auth-token(?:\.\d+)?$/.test(c.name),
  );
  const protectedPaths = ["/edit", "/users", "/registration", "/favorites"];
  const isProtected = protectedPaths.some((p) => path.endsWith(p));

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
      error: user_error,
    } = await supabase.auth.getUser();

    if (user_error || !user) {
      console.error("Error fetching user:", user_error);
      return NextResponse.redirect(new URL("/login", request.url));
    }

    const recipeId = Number(match[1]);
    const { data: recipe, error } = await supabase
      .from("recipes")
      .select("user_id")
      .eq("id", recipeId)
      .single();
    if (error || !recipe || recipe.user_id !== user.id) {
      // ユーザーIDが一致しなければリダイレクト（または403ページなど）
      return NextResponse.redirect(new URL("/", request.url)); // 403ページがあればそちらに
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
