import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "レンタサイクル一覧",
  description: "東紀州エリアのレンタサイクル一覧です。",
};

export default function RentalListPage() {
  return (
    <main>
      <h1>レンタサイクル一覧</h1>
      <p>（レンタサイクル施設の一覧が表示されます）</p>
    </main>
  );
}
