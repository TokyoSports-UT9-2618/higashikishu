import { Section, SectionHeader } from "@/components/ui/Section";
import { FadeIn } from "@/components/ui/FadeIn";
import { MOCK_DATA } from "@/lib/mock-data";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function PostListPage() {
    return (
        <Section className="pt-24 md:pt-32 min-h-screen">
            <FadeIn>
                <SectionHeader
                    title="お知らせ"
                    subtitle="最新のニュース・イベント情報などをお届けします。"
                    className="text-center flex flex-col items-center"
                />
            </FadeIn>
            <div className="max-w-4xl mx-auto flex flex-col gap-4 mt-12">
                {MOCK_DATA.post.map((item, index) => (
                    <FadeIn key={item.id} delay={index * 0.1}>
                        <Link href={`/post/${item.id}`} className="group block glass-panel p-6 md:p-8 rounded-2xl hover-lift">
                            <div className="flex flex-col md:flex-row gap-6 md:items-center">
                                <div className="w-full md:w-1/3 aspect-video md:aspect-[4/3] rounded-xl overflow-hidden shrink-0">
                                    <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                </div>
                                <div className="flex-1 flex flex-col">
                                    <span className="text-sm font-bold text-brand-500 mb-2">{item.date}</span>
                                    <h3 className="text-xl font-bold mb-3 group-hover:text-brand-600 transition-colors">{item.title}</h3>
                                    <p className="text-slate-600 text-sm line-clamp-2 md:line-clamp-3 mb-4">{item.description}</p>
                                    <div className="mt-auto flex items-center text-brand-600 font-medium text-sm">
                                        詳細を見る <ArrowRight className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" />
                                    </div>
                                </div>
                            </div>
                        </Link>
                    </FadeIn>
                ))}
            </div>
        </Section>
    );
}
