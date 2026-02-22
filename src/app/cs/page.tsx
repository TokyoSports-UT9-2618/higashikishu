import type { Metadata } from "next";
import { CONTENT_TYPES } from "@/lib/content-types";
import { getContentfulEntries, getEntryTitle, getEntryImageUrl } from "@/lib/contentful";
import { MOCK_DATA } from "@/lib/mock-data";
import { Section, SectionHeader } from "@/components/ui/Section";
import { ContentCard } from "@/components/ui/ContentCard";
import { FadeIn } from "@/components/ui/FadeIn";

export const metadata: Metadata = {
    title: "サイクルステーション",
    description: "東紀州エリアのサイクルステーション（休憩・サポート施設）です。",
};

export default async function CsListPage() {
    const entries = await getContentfulEntries(CONTENT_TYPES.cs);

    return (
        <Section className="pt-24 md:pt-32">
            <FadeIn>
                <SectionHeader
                    title="サイクルステーション"
                    subtitle="空気入れや工具の貸し出し、休憩など、サイクリストをサポートする施設です。"
                    className="text-center flex flex-col items-center"
                />
            </FadeIn>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {entries.length > 0 || MOCK_DATA.cs.length > 0 ? (
                    (entries.length > 0 ? entries : MOCK_DATA.cs).map((entry, index) => {
                        const isMock = !('sys' in entry);
                        const id = isMock ? entry.id : (entry.sys?.id ?? "item");
                        const title = isMock ? entry.title : getEntryTitle(entry as any);
                        const image = isMock ? entry.image : (getEntryImageUrl(entry as any) || undefined);
                        const description = isMock ? entry.description : ((entry as any).fields?.description as string | undefined);

                        return (
                            <FadeIn key={id} delay={index * 0.1}>
                                <ContentCard
                                    title={title}
                                    href={`/cs/${id}`}
                                    image={image}
                                    description={description}
                                />
                            </FadeIn>
                        );
                    })
                ) : (
                    <div className="col-span-full py-20 text-center glass-panel rounded-3xl">
                        <p className="text-slate-400 font-medium">サイクルステーションの情報は現在準備中です。今しばらくお待ちください。</p>
                    </div>
                )}
            </div>
        </Section>
    );
}
