import { Section, SectionHeader } from "@/components/ui/Section";
import { ContentCard } from "@/components/ui/ContentCard";
import { Container } from "@/components/ui/Container";
import Link from "next/link";
import { ArrowRight, Mountain, Utensils, Landmark } from "lucide-react";
import { CONTENT_TYPES } from "@/lib/content-types";
import { getContentfulEntries, getEntryTitle, getEntryImageUrl } from "@/lib/contentful";
import { FadeIn } from "@/components/ui/FadeIn";
import { CategoryBento } from "@/components/ui/CategoryBento";
import { MOCK_DATA } from "@/lib/mock-data";

export default async function Home() {
  // Fetch a few featured routes or news if available.
  const routes = await getContentfulEntries(CONTENT_TYPES.route);
  const featuredRoutes = routes.slice(0, 3);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      {/* h-screen to make it full viewport height, and no top padding/margin so it starts from the absolute top */}
      <section className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden w-full">
        {/* Abstract/Placeholder Background for Hero */}
        <div className="absolute inset-0 bg-slate-900 overflow-hidden pointer-events-none">
          <iframe
            src="https://www.youtube.com/embed/Mn0y98wJCy8?controls=0&autoplay=1&mute=1&playsinline=1&loop=1&playlist=Mn0y98wJCy8&rel=0&showinfo=0"
            className="absolute top-1/2 left-1/2 w-[200vw] h-[200vh] md:w-[150vw] md:h-[150vh] min-w-[1200px] min-h-[800px] -translate-x-1/2 -translate-y-1/2 opacity-70"
            allow="autoplay; encrypted-media"
            title="Higashikishu Cycling Background Video"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent" />
        </div>

        <Container className="relative z-10 text-center text-white">
          <FadeIn direction="up" delay={0.2}>
            <span className="block text-brand-300 font-bold tracking-[0.3em] uppercase mb-4 text-xs md:text-sm lg:text-base border-b border-brand-300/30 pb-2 w-fit mx-auto">
              サイクリストの聖地を目指して
            </span>
          </FadeIn>
          <FadeIn direction="up" delay={0.4}>
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-serif font-bold mb-8 tracking-tighter leading-[1.1] drop-shadow-2xl">
              HIGASHIKISHU <br />
              <span className="text-brand-300">CYCLING</span>
            </h1>
          </FadeIn>
          <FadeIn direction="up" delay={0.6}>
            <p className="text-lg md:text-2xl text-slate-100 mb-12 max-w-3xl mx-auto font-medium leading-relaxed drop-shadow-lg">
              三重県南部・東紀州エリア。<br className="hidden md:block" />
              碧い海、深い山、奇跡の清流が織りなす絶景の中を走る、<br className="hidden md:block" />
              心震えるサイクリング体験を。
            </p>
          </FadeIn>
          <FadeIn direction="up" delay={0.8}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <Link
                href="/route"
                className="group inline-flex items-center justify-center px-10 py-5 text-white bg-brand-600 font-bold rounded-full hover:bg-brand-500 hover:scale-105 transition-all duration-300 shadow-xl"
              >
                ルートを探す
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="#categories"
                className="inline-flex items-center justify-center px-10 py-5 text-white bg-white/10 backdrop-blur-md border border-white/30 font-bold rounded-full hover:bg-white/20 hover:scale-105 transition-all duration-300"
              >
                エリアを知る
              </Link>
            </div>
          </FadeIn>
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
          <FadeIn delay={0.1}>
            <div className="glass-panel p-8 rounded-2xl hover-lift flex flex-col items-center text-center h-full">
              <div className="w-16 h-16 bg-brand-100 text-brand-600 rounded-full flex items-center justify-center mb-6">
                <Mountain className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-4">海・山・絶景</h3>
              <p className="text-slate-600 leading-relaxed text-sm">
                海岸線は北部はリアス式、南部は美しい砂利浜と表情豊か。さらに海からすぐ山間部につながるため、走っていて飽きることのないエリアです。
              </p>
            </div>
          </FadeIn>

          {/* Feature 2 */}
          <FadeIn delay={0.2}>
            <div className="glass-panel p-8 rounded-2xl hover-lift flex flex-col items-center text-center h-full">
              <div className="w-16 h-16 bg-brand-100 text-brand-600 rounded-full flex items-center justify-center mb-6">
                <Utensils className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-4">グルメ</h3>
              <p className="text-slate-600 leading-relaxed text-sm">
                黒潮と温暖な気候を生かした食の恵み。名物のさんま寿司やめはり寿司、特産のミカンやマイヤーレモンなどを使ったフレッシュジュースがライドの疲れを癒やしてくれます。
              </p>
            </div>
          </FadeIn>

          {/* Feature 3 */}
          <FadeIn delay={0.3}>
            <div className="glass-panel p-8 rounded-2xl hover-lift flex flex-col items-center text-center h-full">
              <div className="w-16 h-16 bg-brand-100 text-brand-600 rounded-full flex items-center justify-center mb-6">
                <Landmark className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-4">歴史</h3>
              <p className="text-slate-600 leading-relaxed text-sm">
                東紀州は別名・熊野エリア。熊野古道はもちろん、神武東征の上陸地や日本最古の神社などがあり、昔ながらの風情を残した落ち着いた気持になるエリアです。
              </p>
            </div>
          </FadeIn>
        </div>
      </Section>

      {/* Categories Bento Grid */}
      <Section id="categories" className="bg-white">
        <SectionHeader
          title="探す"
          subtitle="東紀州の魅力をカテゴリ別に探す"
          className="text-center flex flex-col items-center"
        />
        <CategoryBento />
      </Section>

      {/* Featured Routes Preview */}
      <Section className="bg-slate-50">
        <div className="flex justify-between items-end mb-12">
          <SectionHeader
            title="おすすめルート"
            className="mb-0"
          />
          <Link href="/route" className="hidden md:flex items-center text-brand-600 font-bold hover:text-brand-800 transition-colors">
            すべて見る <ArrowRight className="ml-1 w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {(featuredRoutes.length > 0 ? featuredRoutes : MOCK_DATA.route.slice(0, 3)).map((entry, index) => {
            const isMock = !('sys' in entry);
            const id = isMock ? entry.id : (entry.sys?.id ?? "item");
            const title = isMock ? entry.title : getEntryTitle(entry as any);
            const image = isMock ? entry.image : (getEntryImageUrl(entry as any) || undefined);
            const description = isMock ? entry.description : ((entry as any).fields?.description as string | undefined);

            return (
              <FadeIn key={`route-${id}`} delay={index * 0.1}>
                <ContentCard
                  title={title}
                  href={`/route/${id}`}
                  image={image}
                  description={description}
                  className="h-full"
                />
              </FadeIn>
            );
          })}
        </div>

        <div className="mt-8 text-center md:hidden">
          <Link href="/route" className="inline-flex items-center text-brand-600 font-bold border border-brand-200 bg-white px-6 py-3 rounded-full hover:bg-brand-50 transition-colors shadow-sm">
            すべて見る <ArrowRight className="ml-2 w-4 h-4" />
          </Link>
        </div>
      </Section>

    </div>
  );
}
