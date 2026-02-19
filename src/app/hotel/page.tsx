import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "やさしい宿一覧",
  description: "東紀州エリアのサイクリスト向けやさしい宿の一覧です。",
};

export default function HotelListPage() {
  return (
    <main>
      <h1>やさしい宿一覧</h1>
      <p>（宿泊施設の一覧が表示されます）</p>
    </main>
  );
}
