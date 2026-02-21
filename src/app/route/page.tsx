import type { Metadata } from "next";
import { getContentfulEntries } from "@/lib/contentful";

export const metadata: Metadata = {
  title: "サイクリングルート一覧",
  description: "東紀州エリアのサイクリングルート一覧です。",
};

export default async function RouteListPage() {
  const entries = await getContentfulEntries("route");

  return (
    <main>
      <h1>サイクリングルート一覧</h1>
      {entries.length === 0 ? (
        <p>（現在、公開準備中です）</p>
      ) : (
        <ul>
          {entries.map((entry) => {
            const fallbackId = entry.sys?.id ?? "item";
            const rawTitle = entry.fields?.title;
            const title =
              typeof rawTitle === "string" && rawTitle.trim().length > 0
                ? rawTitle
                : fallbackId;

            return <li key={fallbackId}>{title}</li>;
          })}
        </ul>
      )}
    </main>
  );
}
