import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "サイクリングルート一覧",
  description: "東紀州エリアのサイクリングルート一覧です。",
};

export default function RouteListPage() {
  return (
    <main>
      <h1>サイクリングルート一覧</h1>
      <p>（ルートの一覧が表示されます）</p>
    </main>
  );
}
