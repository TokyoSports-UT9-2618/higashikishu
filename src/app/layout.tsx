import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "東紀州サイクリング",
    template: "%s | 東紀州サイクリング",
  },
  description:
    "東紀州エリアのサイクリング情報。ルート、やさしい宿、サイクルステーション、レンタサイクル、観光スポットをご紹介します。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  );
}
