import type { Metadata } from "next";
import { CONTENT_TYPES } from "@/lib/content-types";
import { getContentfulEntries, getEntryTitle, getEntryImageUrl } from "@/lib/contentful";
import { MOCK_DATA } from "@/lib/mock-data";
import { Section, SectionHeader } from "@/components/ui/Section";
import { ContentCard } from "@/components/ui/ContentCard";
import { FadeIn } from "@/components/ui/FadeIn";

export const metadata: Metadata = {
    title: "宿泊・温泉",
    description: "サイクリストにやさしい東紀州エリアの宿泊施設です。",
};

export default async function HotelListPage() {
    const entries = await getContentfulEntries(CONTENT_TYPES.hotel);

    return (
        <Section className="pt-24 md:pt-32">
            <FadeIn>
                <SectionHeader
                    title="サイクリストにやさしい宿"
                    subtitle="自転車の保管やメンテナンスなど、サイクリストに嬉しい設備が整った宿泊施設です。"
                    className="text-center flex flex-col items-center"
                />
            </FadeIn>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {(entries.length > 0 ? entries : MOCK_DATA.hotel).map((entry, index) => {
                    const isMock = !('sys' in entry);
                    const id = isMock ? entry.id : (entry.sys?.id ?? "item");
                    const title = isMock ? entry.title : getEntryTitle(entry as any);
                    const image = isMock ? entry.image : (getEntryImageUrl(entry as any) || undefined);
                    const description = isMock ? entry.description : ((entry as any).fields?.description as string | undefined);

                    return (
                        <FadeIn key={id} delay={index * 0.1}>
                            <ContentCard
                                title={title}
                                href={`/hotel/${id}`}
                                image={image}
                                description={description}
                            />
                        </FadeIn>
                    );
                })}
            </div>
        </Section>
    );
}
