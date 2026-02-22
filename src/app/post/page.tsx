import type { Metadata } from "next";
import { Section, SectionHeader } from "@/components/ui/Section";

export const metadata: Metadata = {
    title: "お知らせ",
    description: "東紀州サイクリングからのお知らせです。",
};

export default function PostListPage() {
    return (
        <Section>
            <SectionHeader
                title="お知らせ"
                subtitle="最新のニュース・イベント情報などをお届けします。"
            />
            <div className="py-20 text-center text-slate-500 glass-panel rounded-2xl">
                <p>お知らせ情報は準備中です。</p>
            </div>
        </Section>
    );
}
