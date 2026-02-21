import type { Metadata } from "next";
import { CONTENT_TYPES } from "@/lib/content-types";
import { getContentfulEntries, getEntryTitle } from "@/lib/contentful";

export const metadata: Metadata = {
  title: "レンタサイクル一覧",
  description: "東紀州エリアのレンタサイクル一覧です。",
};

export default async function RentalListPage() {
  const entries = await getContentfulEntries(CONTENT_TYPES.rental);

  return (
    <main>
      <h1>レンタサイクル一覧</h1>
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
