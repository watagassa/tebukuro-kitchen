import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <head>
        <title>てぶくろキッチン</title>
        <meta name="description" content="音声認識を使ったレシピアプリ" />
        {/* Googleの検索結果に非表示 */}
        <meta name="robots" content="noindex,nofollow" />
        <meta
          name="format-detection"
          content="telephone=no, email=no, address=no"
        ></meta>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link
          rel="apple-touch-icon"
          href="../../public/apple-touch-icon.png"
        ></link>
        <meta name="viewport" content="width=device-width,initial-scale=1.0" />
        <meta property="og:site_name" content="てぶくろキッチン" />
        {/* <meta property="og:url" content="ページURL" /> */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="てぶくろキッチン" />
        <meta
          property="og:description"
          content="音声認識を使ったレシピアプリ"
        />
        {/* 1200px✕630px */}
        <meta property="og:image" content="../../public/thumbnail.png" />
        {/* <meta property="fb:app_id" content="appIdを入力" /> */}
        <meta property="og:locale" content="ja_JP" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="てぶくろキッチン" />
        <meta
          name="twitter:description"
          content="音声認識を使ったレシピアプリ"
        />
        <meta name="twitter:image" content="../../public/thumbnail.png" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/icon.png"></link>
        <meta name="theme-color" content="#8936FF" />
      </head>

      <body className="bg-white">{children}</body>
    </html>
  );
}
