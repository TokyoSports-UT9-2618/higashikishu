import type { Metadata } from "next";
import { CONTENT_TYPES } from "@/lib/content-types";
import { getContentfulEntries, getEntryTitle } from "@/lib/contentful";

export const metadata: Metadata = {
  title: "サイクルステーション一覧",
  description: "東紀州エリアのサイクルステーション一覧です。",
};

export default async function CycleStationListPage() {
  const entries = await getContentfulEntries(CONTENT_TYPES.cs);

  return (
    <main>
      <h1>サイクルステーション一覧</h1>
      {entries.length === 0 ? (
        <p>（現在、公開準備中です）</p>
      ) : (
        <ul>
          {entries.map((entry) => {
            const id = entry.sys?.id ?? "item";
            return <li key={id}>{getEntryTitle(entry)}</li>;
          })}
        </ul>
      )}
    </main>
  );
}
