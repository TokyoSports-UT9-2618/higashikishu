import type { Metadata } from "next";

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
    title: `観光スポット – ${slug}`,
  };
}

export default async function SpotDetailPage({ params }: Props) {
  const { slug } = await params;
  return (
    <main>
      <h1>観光スポット詳細</h1>
      <p>スラッグ: {slug}</p>
      <p>（観光スポットの詳細情報が表示されます）</p>
    </main>
  );
}
