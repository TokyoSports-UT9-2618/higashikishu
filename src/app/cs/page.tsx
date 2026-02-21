import type { Metadata } from "next";
import { getContentfulEntries } from "@/lib/contentful";

export const metadata: Metadata = {
  title: "サイクルステーション一覧",
  description: "東紀州エリアのサイクルステーション一覧です。",
};

export default async function CycleStationListPage() {
  const entries = await getContentfulEntries("cs");

  return (
    <main>
      <h1>サイクルステーション一覧</h1>
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
