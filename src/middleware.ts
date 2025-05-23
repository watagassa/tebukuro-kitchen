import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const hasToken = request.cookies.getAll().some((c) =>
    // sb-＜何文字でもOK＞-auth-token か sb-*-auth-token.数字 のいずれかにマッチ
    /^sb-[^-]+-auth-token(?:\.\d+)?$/.test(c.name)
  );
  const protectedPaths = ["/edit", "/users", "/registration", "/favorites"];
  const isProtected = protectedPaths.some((p) => path.startsWith(p));

  console.log("Path:", path);
  console.log("User:", hasToken);
  if (isProtected && !hasToken) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("callbackUrl", request.nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
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
