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
    title: `ルート – ${slug}`,
  };
}

export default async function RouteDetailPage({ params }: Props) {
  const { slug } = await params;
  return (
    <main>
      <h1>ルート詳細</h1>
      <p>スラッグ: {slug}</p>
      <p>（ルートの詳細情報・地図が表示されます）</p>
    </main>
  );
}
