import type { Metadata } from "next";
import { CONTENT_TYPES } from "@/lib/content-types";
import { getContentfulEntries, getEntryTitle, getEntryImageUrl } from "@/lib/contentful";
import { MOCK_DATA } from "@/lib/mock-data";
import { Section, SectionHeader } from "@/components/ui/Section";
import { ContentCard } from "@/components/ui/ContentCard";
import { FadeIn } from "@/components/ui/FadeIn";

export const metadata: Metadata = {
    title: "観光スポット",
    description: "東紀州エリアの魅力あふれる観光スポットをご紹介します。",
};

export default async function SpotsListPage() {
    const entries = await getContentfulEntries(CONTENT_TYPES.spots);

    return (
        <Section className="pt-24 md:pt-32">
            <FadeIn>
                <SectionHeader
                    title="観光スポット"
                    subtitle="歴史と自然が交差する、東紀州の見どころをご紹介します。"
                    className="text-center flex flex-col items-center"
                />
            </FadeIn>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {(entries.length > 0 ? entries : MOCK_DATA.spots).map((entry, index) => {
                    const isMock = !('sys' in entry);
                    const id = isMock ? entry.id : (entry.sys?.id ?? "item");
                    const title = isMock ? entry.title : getEntryTitle(entry as any);
                    const image = isMock ? entry.image : (getEntryImageUrl(entry as any) || undefined);
                    const description = isMock ? entry.description : ((entry as any).fields?.description as string | undefined);

                    return (
                        <FadeIn key={id} delay={index * 0.1}>
                            <ContentCard
                                title={title}
                                href={`/spots/${id}`}
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
