import "./globals.css";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "てぶくろキッチン",
    template: `%s | てぶくろキッチン`,
  },
  description: "音声認識を使ったレシピアプリ",
  alternates: {
    canonical: "/",
  },
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
    title: {
      default: "てぶくろキッチン",
      template: `%s | てぶくろキッチン`,
    },
    description: "音声認識を使ったレシピアプリ",
    images: ["/thumbnail.png"],
    locale: "ja_JP",
  },
  twitter: {
    card: "summary_large_image",
    title: {
      default: "てぶくろキッチン",
      template: `%s | てぶくろキッチン`,
    },
    description: "音声認識を使ったレシピアプリ",
    images: ["/thumbnail.png"],
  },
  applicationName: "てぶくろキッチン",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#FFFBF4",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/icon.png"></link>
        <meta name="theme-color" content="#FF9500" />
      </head>
      <body className="bg-white">{children}</body>
    </html>
  );
}
