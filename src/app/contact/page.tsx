import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "お問い合わせ",
  description: "東紀州サイクリングへのお問い合わせフォームです。",
};

export default function ContactPage() {
  return (
    <main>
      <h1>お問い合わせ</h1>
      <p>（お問い合わせフォームが表示されます）</p>
    </main>
  );
}
