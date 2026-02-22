import type { Metadata } from "next";
import { CONTENT_TYPES } from "@/lib/content-types";
import { getContentfulEntries, getEntryTitle, getEntryImageUrl } from "@/lib/contentful";
import { Section, SectionHeader } from "@/components/ui/Section";
import { ContentCard } from "@/components/ui/ContentCard";

export const metadata: Metadata = {
    title: "サイクルステーション",
    description: "東紀州エリアのサイクルステーション（休憩・サポート施設）です。",
};

export default async function CsListPage() {
    const entries = await getContentfulEntries(CONTENT_TYPES.cs);

    return (
        <Section>
            <SectionHeader
                title="サイクルステーション"
                subtitle="空気入れや工具の貸し出し、休憩スペースを提供するサポート施設をご紹介します。"
            />

            {entries.length === 0 ? (
                <div className="py-20 text-center text-slate-500 glass-panel rounded-2xl">
                    <p>施設情報は準備中です。</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {entries.map((entry) => {
                        const id = entry.sys?.id ?? "item";
                        const title = getEntryTitle(entry);
                        const image = getEntryImageUrl(entry) || undefined;
                        const description = entry.fields?.description as string | undefined;

                        return (
                            <ContentCard
                                key={id}
                                title={title}
                                href={`/cs/${id}`}
                                image={image}
                                description={description}
                            />
                        );
                    })}
                </div>
            )}
        </Section>
    );
}
