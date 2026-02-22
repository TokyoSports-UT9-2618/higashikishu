import type { Metadata } from "next";
import { CONTENT_TYPES } from "@/lib/content-types";
import { getContentfulEntries, getEntryTitle, getEntryImageUrl } from "@/lib/contentful";
import { Section, SectionHeader } from "@/components/ui/Section";
import { ContentCard } from "@/components/ui/ContentCard";

export const metadata: Metadata = {
    title: "観光スポット",
    description: "東紀州エリアの魅力あふれる観光スポットをご紹介します。",
};

export default async function SpotsListPage() {
    const entries = await getContentfulEntries(CONTENT_TYPES.spots);

    return (
        <Section>
            <SectionHeader
                title="観光スポット"
                subtitle="歴史と自然が交差する、東紀州の見どころをご紹介します。"
            />

            {entries.length === 0 ? (
                <div className="py-20 text-center text-slate-500 glass-panel rounded-2xl">
                    <p>スポット情報は準備中です。</p>
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
                                href={`/spots/${id}`}
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
