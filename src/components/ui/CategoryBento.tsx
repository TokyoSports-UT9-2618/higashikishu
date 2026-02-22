"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Map, Coffee, BedDouble, Wrench, Bike, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

const categories = [
    {
        id: "route",
        title: "サイクリングルート",
        desc: "海・山・川の絶景を楽しむ",
        href: "/route",
        icon: Map,
        image: "https://images.unsplash.com/photo-1541625602330-2277a4c46182?q=80&w=800&auto=format&fit=crop",
        colSpan: "col-span-1 md:col-span-2",
        rowSpan: "row-span-2",
    },
    {
        id: "spots",
        title: "観光・飲食店",
        desc: "おいしいグルメと名所",
        href: "/spots",
        icon: Coffee,
        image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=600&auto=format&fit=crop",
        colSpan: "col-span-1",
        rowSpan: "row-span-1",
    },
    {
        id: "hotel",
        title: "宿泊施設",
        desc: "サイクリスト歓迎の宿",
        href: "/hotel",
        icon: BedDouble,
        image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=600&auto=format&fit=crop",
        colSpan: "col-span-1",
        rowSpan: "row-span-1",
    },
    {
        id: "cs",
        title: "サポート",
        desc: "安心して走るための施設",
        href: "/cs",
        icon: Wrench,
        image: "https://images.unsplash.com/photo-1620807755913-91b7e6ec38f2?q=80&w=600&auto=format&fit=crop",
        colSpan: "col-span-1",
        rowSpan: "row-span-1",
    },
    {
        id: "rental",
        title: "レンタサイクル",
        desc: "手ぶらで楽しむ",
        href: "/rental",
        icon: Bike,
        image: "https://images.unsplash.com/photo-1485965120184-e220f721d03e?q=80&w=600&auto=format&fit=crop",
        colSpan: "col-span-1",
        rowSpan: "row-span-1",
    },
];

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
        },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const } },
};

export function CategoryBento() {
    return (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-6 auto-rows-[200px]"
        >
            {categories.map((cat) => {
                const Icon = cat.icon;
                return (
                    <motion.div
                        key={cat.id}
                        variants={itemVariants}
                        className={cn(
                            "group relative overflow-hidden rounded-3xl",
                            cat.colSpan,
                            cat.rowSpan
                        )}
                    >
                        <Link href={cat.href} className="flex h-full w-full">
                            <div className="absolute inset-0 bg-slate-900">
                                <img
                                    src={cat.image}
                                    alt={cat.title}
                                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-60 group-hover:opacity-50"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-transparent" />
                            </div>
                            <div className="relative z-10 flex flex-col justify-end p-6 w-full md:p-8">
                                <div className="mb-2 inline-flex items-center justify-center rounded-full bg-white/20 p-3 backdrop-blur-md w-fit text-white group-hover:bg-brand-500 group-hover:scale-110 transition-all duration-300">
                                    <Icon className="h-6 w-6" />
                                </div>
                                <h3 className="text-2xl font-bold text-white mb-1 group-hover:text-brand-300 transition-colors">
                                    {cat.title}
                                </h3>
                                <p className="text-slate-300 text-sm md:text-base mb-4 opacity-0 -translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                                    {cat.desc}
                                </p>
                                <div className="absolute bottom-6 right-6 opacity-0 translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                                    <ArrowRight className="text-white w-6 h-6" />
                                </div>
                            </div>
                        </Link>
                    </motion.div>
                );
            })}
        </motion.div>
    );
}
