import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "観光スポット一覧",
  description: "東紀州エリアの観光スポット一覧です。",
};

export default function SpotsListPage() {
  return (
    <main>
      <h1>観光スポット一覧</h1>
      <p>（観光スポットの一覧が表示されます）</p>
    </main>
  );
}
