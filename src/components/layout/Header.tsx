"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Container } from "../ui/Container";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import { useState } from "react";

const navLinks = [
    { name: "お知らせ", href: "/post" },
    { name: "サイクリングルート", href: "/route" },
    { name: "サイクルステーション", href: "/cs" },
    { name: "サイクリストにやさしい宿", href: "/hotel" },
    { name: "レンタサイクル", href: "/rental" },
];

export function Header() {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);

    return (
        <header className="fixed top-0 w-full z-50 glass-panel border-b border-white/40">
            <Container>
                <div className="flex items-center justify-between h-16 md:h-20">
                    <Link href="/" className="flex items-center gap-2 group">
                        <span className="font-serif text-xl md:text-2xl font-bold tracking-tighter text-brand-900 group-hover:text-brand-600 transition-colors">
                            東紀州
                        </span>
                    </Link>

                    {/* Desktop Nav */}
                    <nav className="hidden md:flex items-center gap-6">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={cn(
                                    "text-sm font-medium transition-colors hover:text-brand-600",
                                    pathname === link.href ? "text-brand-600 font-bold" : "text-slate-600"
                                )}
                            >
                                {link.name}
                            </Link>
                        ))}
                    </nav>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden p-2 text-slate-600 hover:text-brand-600"
                        onClick={() => setIsOpen(!isOpen)}
                        aria-label="Toggle menu"
                    >
                        {isOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </Container>

            {/* Mobile Nav */}
            {isOpen && (
                <div className="md:hidden absolute top-full left-0 w-full bg-white/95 backdrop-blur-md border-b border-brand-100 shadow-lg">
                    <nav className="flex flex-col py-4 px-6 gap-4">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                onClick={() => setIsOpen(false)}
                                className={cn(
                                    "text-lg font-medium tracking-wide py-2 border-b border-slate-100 last:border-0",
                                    pathname === link.href ? "text-brand-600 font-bold" : "text-slate-700"
                                )}
                            >
                                {link.name}
                            </Link>
                        ))}
                    </nav>
                </div>
            )}
        </header>
    );
}
