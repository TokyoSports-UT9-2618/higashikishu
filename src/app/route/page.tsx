import type { Metadata } from "next";
import { CONTENT_TYPES } from "@/lib/content-types";
import { getContentfulEntries, getEntryTitle, getEntryImageUrl } from "@/lib/contentful";
import { Section, SectionHeader } from "@/components/ui/Section";
import { ContentCard } from "@/components/ui/ContentCard";

export const metadata: Metadata = {
    title: "サイクリングルート一覧",
    description: "東紀州エリアの絶景サイクリングルートをご紹介します。",
};

export default async function RouteListPage() {
    const entries = await getContentfulEntries(CONTENT_TYPES.route);

    return (
        <Section>
            <SectionHeader
                title="サイクリングルート"
                subtitle="海と山が織りなす東紀州ならではの絶景ルートをお楽しみください。"
            />

            {entries.length === 0 ? (
                <div className="py-20 text-center text-slate-500 glass-panel rounded-2xl">
                    <p>ルート情報は準備中です。</p>
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
                                href={`/route/${id}`}
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
