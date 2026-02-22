import { Container } from "../ui/Container";

export function Footer() {
    return (
        <footer className="bg-brand-900 text-brand-50 py-12 mt-24">
            <Container>
                <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="text-center md:text-left">
                        <h2 className="font-serif text-2xl font-bold mb-2">東紀州サイクリング</h2>
                        <p className="text-brand-200 text-sm">三重県南部を巡る、絶景と歴史の旅</p>
                    </div>
                    <p className="text-sm text-brand-300">
                        © {new Date().getFullYear()} Higashikishu Area. All rights reserved.
                    </p>
                </div>
            </Container>
        </footer>
    );
}
