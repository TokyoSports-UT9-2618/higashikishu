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
    title: `サイクルステーション – ${slug}`,
  };
}

export default async function CycleStationDetailPage({ params }: Props) {
  const { slug } = await params;
  return (
    <main>
      <h1>サイクルステーション詳細</h1>
      <p>スラッグ: {slug}</p>
      <p>（サイクルステーションの詳細情報が表示されます）</p>
    </main>
  );
}
