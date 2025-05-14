import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "てぶくろキッチン",
  description: "音声認識を使ったレシピアプリ",
  robots: "noindex,nofollow",
  formatDetection: {
    telephone: false,
    email: false,
    address: false,
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    type: "website",
    siteName: "てぶくろキッチン",
    title: "てぶくろキッチン",
    description: "音声認識を使ったレシピアプリ",
    images: ["/thumbnail.png"],
    locale: "ja_JP",
  },
  twitter: {
    card: "summary_large_image",
    title: "てぶくろキッチン",
    description: "音声認識を使ったレシピアプリ",
    images: ["/thumbnail.png"],
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className="bg-white">{children}</body>
    </html>
  );
}
