import type { Metadata } from "next";
import { CONTENT_TYPES } from "@/lib/content-types";
import { getContentfulEntries, getEntryTitle, getEntryImageUrl } from "@/lib/contentful";
import { MOCK_DATA } from "@/lib/mock-data";
import { Section, SectionHeader } from "@/components/ui/Section";
import { ContentCard } from "@/components/ui/ContentCard";
import { FadeIn } from "@/components/ui/FadeIn";

export const metadata: Metadata = {
    title: "レンタサイクル",
    description: "東紀州エリアのレンタサイクル情報です。",
};

export default async function RentalListPage() {
    const entries = await getContentfulEntries(CONTENT_TYPES.rental);

    return (
        <Section className="pt-24 md:pt-32">
            <FadeIn>
                <SectionHeader
                    title="レンタサイクル"
                    subtitle="手ぶらで来ても大丈夫。スポーツバイクのレンタルを行っている施設をご紹介します。"
                    className="text-center flex flex-col items-center"
                />
            </FadeIn>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {(entries.length > 0 ? entries : MOCK_DATA.rental).map((entry, index) => {
                    const isMock = !('sys' in entry);
                    const id = isMock ? entry.id : (entry.sys?.id ?? "item");
                    const title = isMock ? entry.title : getEntryTitle(entry as any);
                    const image = isMock ? entry.image : (getEntryImageUrl(entry as any) || undefined);
                    const description = isMock ? entry.description : ((entry as any).fields?.description as string | undefined);

                    return (
                        <FadeIn key={id} delay={index * 0.1}>
                            <ContentCard
                                title={title}
                                href={`/rental/${id}`}
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
