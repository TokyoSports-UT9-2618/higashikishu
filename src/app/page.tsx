import { Section, SectionHeader } from "@/components/ui/Section";
import { ContentCard } from "@/components/ui/ContentCard";
import { Container } from "@/components/ui/Container";
import Link from "next/link";
import { ArrowRight, Mountain, Utensils, Landmark } from "lucide-react";
import { CONTENT_TYPES } from "@/lib/content-types";
import { getContentfulEntries, getEntryTitle, getEntryImageUrl } from "@/lib/contentful";

export default async function Home() {
  // Fetch a few featured routes or news if available.
  const routes = await getContentfulEntries(CONTENT_TYPES.route);
  const featuredRoutes = routes.slice(0, 3);

  return (
    <div className="flex flex-col min-h-screen">

      {/* Hero Section */}
      <section className="relative h-[80vh] min-h-[600px] flex items-center justify-center overflow-hidden">
        {/* Abstract/Placeholder Background for Hero */}
        <div className="absolute inset-0 bg-slate-900">
          <img
            src="https://images.unsplash.com/photo-1541625602330-2277a4c46182?q=80&w=2070&auto=format&fit=crop"
            alt="Higashikishu Cycling"
            className="w-full h-full object-cover opacity-50"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent" />
        </div>

        <Container className="relative z-10 text-center text-white">
          <span className="block text-brand-300 font-bold tracking-widest uppercase mb-4 text-sm md:text-base">
            サイクリストの聖地を目指して
          </span>
          <h1 className="text-5xl md:text-7xl font-serif font-bold mb-6 tracking-tight leading-tight">
            HIGASHIKISHU <br /> CYCLING
          </h1>
          <p className="text-lg md:text-xl text-slate-200 mb-10 max-w-2xl mx-auto font-medium">
            三重県南部・東紀州エリア。<br className="hidden md:block" />
            海、山、川が織りなす絶景の中を走る、至高のサイクリング体験。
          </p>
          <Link
            href="/route"
            className="inline-flex items-center justify-center px-8 py-4 text-brand-900 bg-white font-bold rounded-full hover:bg-brand-50 hover:scale-105 transition-all duration-300 shadow-xl"
          >
            ルートを探す
            <ArrowRight className="ml-2 w-5 h-5" />
          </Link>
        </Container>
      </section>

      {/* Concept Section */}
      <Section className="bg-slate-50">
        <SectionHeader
          title="東紀州サイクリングとは"
          subtitle="紀北町から尾鷲市、熊野市、御浜町を経て紀宝町へ。南北に長い東紀州エリアならではの魅力にあふれています。"
          className="text-center flex flex-col items-center"
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          {/* Feature 1 */}
          <div className="glass-panel p-8 rounded-2xl hover-lift flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-brand-100 text-brand-600 rounded-full flex items-center justify-center mb-6">
              <Mountain className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold mb-4">海・山・絶景</h3>
            <p className="text-slate-600 leading-relaxed text-sm">
              海岸線は北部はリアス式、南部は美しい砂利浜と表情豊か。さらに海からすぐ山間部につながるため、走っていて飽きることのないエリアです。
            </p>
          </div>

          {/* Feature 2 */}
          <div className="glass-panel p-8 rounded-2xl hover-lift flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-brand-100 text-brand-600 rounded-full flex items-center justify-center mb-6">
              <Utensils className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold mb-4">グルメ</h3>
            <p className="text-slate-600 leading-relaxed text-sm">
              黒潮と温暖な気候を生かした食の恵み。名物のさんま寿司やめはり寿司、特産のミカンやマイヤーレモンなどを使ったフレッシュジュースがライドの疲れを癒やしてくれます。
            </p>
          </div>

          {/* Feature 3 */}
          <div className="glass-panel p-8 rounded-2xl hover-lift flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-brand-100 text-brand-600 rounded-full flex items-center justify-center mb-6">
              <Landmark className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold mb-4">歴史</h3>
            <p className="text-slate-600 leading-relaxed text-sm">
              東紀州は別名・熊野エリア。熊野古道はもちろん、神武東征の上陸地や日本最古の神社などがあり、昔ながらの風情を残した落ち着いた気持になるエリアです。
            </p>
          </div>
        </div>
      </Section>

      {/* Featured Routes Preview */}
      <Section className="bg-white">
        <div className="flex justify-between items-end mb-12">
          <SectionHeader
            title="おすすめルート"
            className="mb-0"
          />
          <Link href="/route" className="hidden md:flex items-center text-brand-600 font-bold hover:text-brand-800 transition-colors">
            すべて見る <ArrowRight className="ml-1 w-4 h-4" />
          </Link>
        </div>

        {featuredRoutes.length === 0 ? (
          <div className="py-12 text-center text-slate-500 bg-slate-50 rounded-2xl">
            <p>ルート情報は準備中です。</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredRoutes.map((entry) => (
              <ContentCard
                key={entry.sys?.id ?? "item"}
                title={getEntryTitle(entry)}
                href={`/route/${entry.sys?.id}`}
                image={getEntryImageUrl(entry) || undefined}
                description={entry.fields?.description as string | undefined}
              />
            ))}
          </div>
        )}

        <div className="mt-8 text-center md:hidden">
          <Link href="/route" className="inline-flex items-center text-brand-600 font-bold border border-brand-200 px-6 py-3 rounded-full hover:bg-brand-50 transition-colors">
            すべて見る <ArrowRight className="ml-2 w-4 h-4" />
          </Link>
        </div>
      </Section>

    </div>
  );
}
