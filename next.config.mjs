/** @type {import('next').NextConfig} */
import nextPwa from "next-pwa";

const withPWA = nextPwa({
  dest: "public",
  // disable: process.env.NODE_ENV === 'development',
  register: true,
  skipWaiting: true,
});

const nextConfig = {
  images: {
    // googleのユーザ画像を表示するための設定
    domains: ["lh3.googleusercontent.com"],
    // domains: [process.env.NEXT_PUBLIC_SUPABASE_URL.split("/")[2]],
    domains: ["lh3.googleusercontent.com"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: process.env.NEXT_PUBLIC_SUPABASE_URL.split("/")[2],
      },
    ],
  },
};

export default withPWA(nextConfig);
