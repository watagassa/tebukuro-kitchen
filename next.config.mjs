/** @type {import('next').NextConfig} */
import nextPwa from "next-pwa";
import withBundleAnalyzer from "@next/bundle-analyzer";

const withPWA = nextPwa({
  dest: "public",
  // disable: process.env.NODE_ENV === 'development',
  register: true,
  skipWaiting: true,
});

const nextConfig = {
  reactStrictMode: true,
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

export default withBundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
})(withPWA(nextConfig));
