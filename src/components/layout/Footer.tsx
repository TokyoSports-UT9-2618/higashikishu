import { Container } from "../ui/Container";
import Link from "next/link";

const navLinks = [
    { name: "お知らせ", href: "/post" },
    { name: "サイクリングルート", href: "/route" },
    { name: "サイクルステーション", href: "/cs" },
    { name: "サイクリストにやさしい宿", href: "/hotel" },
    { name: "レンタサイクル", href: "/rental" },
];

export function Footer() {
    return (
        <footer className="bg-brand-900 text-brand-50 py-12 mt-24">
            <Container>
                <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-8 border-b border-brand-800 pb-8 mb-8">
                    <div className="text-center md:text-left">
                        <Link href="/">
                            <h2 className="font-serif text-2xl font-bold mb-2 hover:text-white transition-colors">HIGASHIKISHU CYCLING</h2>
                        </Link>
                        <p className="text-brand-200 text-sm">三重県南部を巡る、絶景と歴史の旅</p>
                    </div>

                    <nav className="flex flex-col md:flex-row gap-4 md:gap-8 text-center md:text-left">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className="text-brand-200 hover:text-white text-sm transition-colors"
                            >
                                {link.name}
                            </Link>
                        ))}
                    </nav>
                </div>

                <div className="flex justify-center md:justify-end">
                    <p className="text-xs text-brand-400">
                        © 2026 一般社団法人東紀州地域振興公社 All rights reserved.
                    </p>
                </div>
            </Container>
        </footer>
    );
}
