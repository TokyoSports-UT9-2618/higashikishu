import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ホーム",
};

export default function HomePage() {
  return (
    <main>
      <h1>東紀州サイクリング</h1>
      <p>東紀州エリアのサイクリング情報サイトです。</p>
    </main>
  );
}
