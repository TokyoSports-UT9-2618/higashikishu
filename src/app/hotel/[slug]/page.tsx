import type { Metadata } from "next";

// Will be replaced with real Contentful slugs once the CMS is connected
export function generateStaticParams() {
  return [];
}

export const dynamicParams = false;

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  return {
    title: `やさしい宿 – ${slug}`,
  };
}

export default async function HotelDetailPage({ params }: Props) {
  const { slug } = await params;
  return (
    <main>
      <h1>やさしい宿詳細</h1>
      <p>スラッグ: {slug}</p>
      <p>（施設の詳細情報が表示されます）</p>
    </main>
  );
}
