import type { Metadata } from "next";
import Link from "next/link";
import { CONTENT_TYPES } from "@/lib/content-types";
import { getContentfulEntries } from "@/lib/contentful";

export const metadata: Metadata = {
  title: "ホーム",
};

const LIST_PAGES = [
  { href: "/route", label: "サイクリングルート", contentType: CONTENT_TYPES.route },
  { href: "/hotel", label: "やさしい宿", contentType: CONTENT_TYPES.hotel },
  { href: "/cs", label: "サイクルステーション", contentType: CONTENT_TYPES.cs },
  { href: "/rental", label: "レンタサイクル", contentType: CONTENT_TYPES.rental },
  { href: "/spots", label: "観光スポット", contentType: CONTENT_TYPES.spots },
] as const;

export default async function HomePage() {
  const counts = await Promise.all(
    LIST_PAGES.map(async (page) => {
      const entries = await getContentfulEntries(page.contentType);
      return {
        href: page.href,
        label: page.label,
        count: entries.length,
      };
    }),
  );

  return (
    <main>
      <h1>東紀州サイクリング</h1>
      <p>東紀州エリアのサイクリング情報サイトです。</p>
      <h2>一覧ページ</h2>
      <ul>
        {counts.map((item) => (
          <li key={item.href}>
            <Link href={item.href}>{item.label}</Link>
            {": "}
            {item.count > 0 ? `${item.count}件` : "準備中"}
          </li>
        ))}
      </ul>
    </main>
  );
}
