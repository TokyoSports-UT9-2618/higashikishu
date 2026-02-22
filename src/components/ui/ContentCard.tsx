import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface CardProps {
    title: string;
    href: string;
    image?: string;
    description?: string;
    className?: string;
}

export function ContentCard({ title, href, image, description, className }: CardProps) {
    return (
        <Link href={href} className={cn("group block h-full", className)}>
            <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-hover transition-all duration-300 h-full flex flex-col border border-slate-100 group-hover:-translate-y-1">

                {/* Image Area */}
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-100">
                    {image ? (
                        <img
                            src={image}
                            alt={title}
                            className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500 ease-out"
                        />
                    ) : (
                        <div className="absolute inset-0 flex items-center justify-center bg-brand-50 text-brand-300">
                            <span className="font-serif">No Image</span>
                        </div>
                    )}
                    {/* Subtle gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                {/* Content Area */}
                <div className="p-6 flex flex-col flex-1">
                    <h3 className="text-xl font-bold mb-3 group-hover:text-brand-600 transition-colors line-clamp-2">
                        {title}
                    </h3>
                    {description && (
                        <p className="text-slate-600 text-sm mb-4 line-clamp-3 flex-1 pb-4">
                            {description}
                        </p>
                    )}
                    <div className="mt-auto flex items-center text-brand-500 font-medium text-sm group-hover:text-brand-600">
                        詳細を見る
                        <ArrowRight className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" />
                    </div>
                </div>
            </div>
        </Link>
    );
}
