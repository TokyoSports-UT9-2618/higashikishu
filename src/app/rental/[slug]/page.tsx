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
    title: `レンタサイクル – ${slug}`,
  };
}

export default async function RentalDetailPage({ params }: Props) {
  const { slug } = await params;
  return (
    <main>
      <h1>レンタサイクル詳細</h1>
      <p>スラッグ: {slug}</p>
      <p>（レンタサイクル施設の詳細情報が表示されます）</p>
    </main>
  );
}
