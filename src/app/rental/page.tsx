import type { Metadata } from "next";
import { CONTENT_TYPES } from "@/lib/content-types";
import { getContentfulEntries, getEntryTitle, getEntryImageUrl } from "@/lib/contentful";
import { Section, SectionHeader } from "@/components/ui/Section";
import { ContentCard } from "@/components/ui/ContentCard";

export const metadata: Metadata = {
    title: "レンタサイクル",
    description: "東紀州エリアのレンタサイクル情報です。",
};

export default async function RentalListPage() {
    const entries = await getContentfulEntries(CONTENT_TYPES.rental);

    return (
        <Section>
            <SectionHeader
                title="レンタサイクル"
                subtitle="手ぶらで来ても大丈夫。スポーツバイクのレンタルを行っている施設をご紹介します。"
            />

            {entries.length === 0 ? (
                <div className="py-20 text-center text-slate-500 glass-panel rounded-2xl">
                    <p>レンタサイクル情報は準備中です。</p>
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
                                href={`/rental/${id}`}
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
