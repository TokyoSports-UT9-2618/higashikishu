import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "サイクルステーション一覧",
  description: "東紀州エリアのサイクルステーション一覧です。",
};

export default function CycleStationListPage() {
  return (
    <main>
      <h1>サイクルステーション一覧</h1>
      <p>（サイクルステーションの一覧が表示されます）</p>
    </main>
  );
}
