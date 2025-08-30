/** @type {import('next').NextConfig} */

import nextPWA from 'next-pwa';

const withPWA = nextPWA({
  dest: 'public',
  register: true,
  skipWaiting: true,
})

if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
  throw new Error("環境変数 NEXT_PUBLIC_SUPABASE_URL が設定されていません");
}

const nextConfig = withPWA({
  reactStrictMode: true,
  images: {
    // googleのユーザ画像を表示するための設定
    domains: ["lh3.googleusercontent.com"],
    // domains: [process.env.NEXT_PUBLIC_SUPABASE_URL.split("/")[2]],
    remotePatterns: [
      {
        protocol: "https",
        hostname: process.env.NEXT_PUBLIC_SUPABASE_URL.split("/")[2],
      },
    ],
  }
})

export default nextConfig