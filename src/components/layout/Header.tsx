"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Container } from "../ui/Container";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import { useState, useEffect } from "react";

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
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        handleScroll();
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const isTopPage = pathname === "/";
    const isTransparent = isTopPage && !isScrolled;

    return (
        <header className={cn(
            "fixed top-0 w-full z-50 transition-all duration-300",
            isTransparent && !isOpen ? "bg-transparent border-transparent" : "glass-panel border-b border-white/40"
        )}>
            <Container>
                <div className="flex items-center justify-between h-16 md:h-20">
                    <Link href="/" className="flex items-center gap-2 group">
                        <span className={cn(
                            "font-serif text-xl md:text-2xl font-bold tracking-tighter transition-colors",
                            isTransparent && !isOpen ? "text-white" : "text-brand-900 group-hover:text-brand-600"
                        )}>
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
                                    "text-sm font-medium transition-colors",
                                    pathname === link.href
                                        ? (isTransparent && !isOpen ? "text-white font-bold" : "text-brand-600 font-bold")
                                        : (isTransparent && !isOpen ? "text-white/90 hover:text-white" : "text-slate-600 hover:text-brand-600")
                                )}
                            >
                                {link.name}
                            </Link>
                        ))}
                    </nav>

                    {/* Mobile Menu Button */}
                    <button
                        className={cn(
                            "md:hidden p-2 transition-colors",
                            isTransparent && !isOpen ? "text-white" : "text-slate-600 hover:text-brand-600"
                        )}
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
