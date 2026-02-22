import type { Metadata } from "next";
import { CONTENT_TYPES } from "@/lib/content-types";
import { getContentfulEntries, getEntryTitle, getEntryImageUrl } from "@/lib/contentful";
import { Section, SectionHeader } from "@/components/ui/Section";
import { ContentCard } from "@/components/ui/ContentCard";

export const metadata: Metadata = {
    title: "宿泊・温泉",
    description: "サイクリストにやさしい東紀州エリアの宿泊施設です。",
};

export default async function HotelListPage() {
    const entries = await getContentfulEntries(CONTENT_TYPES.hotel);

    return (
        <Section>
            <SectionHeader
                title="サイクリストにやさしい宿"
                subtitle="自転車の保管やメンテナンスなど、サイクリストに嬉しいサービスを提供する宿泊施設をご紹介します。"
            />

            {entries.length === 0 ? (
                <div className="py-20 text-center text-slate-500 glass-panel rounded-2xl">
                    <p>宿泊施設情報は準備中です。</p>
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
                                href={`/hotel/${id}`}
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
