import { cn } from "@/lib/utils";
import { Container } from "./Container";

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
    children: React.ReactNode;
    containerClassName?: string;
}

export function Section({ className, containerClassName, children, ...props }: SectionProps) {
    return (
        <section className={cn("py-16 md:py-24", className)} {...props}>
            <Container className={containerClassName}>
                {children}
            </Container>
        </section>
    );
}

export function SectionHeader({ title, subtitle, className }: { title: string, subtitle?: string, className?: string }) {
    return (
        <div className={cn("mb-12 md:mb-16", className)}>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">{title}</h2>
            {subtitle && <p className="text-lg text-slate-600 max-w-2xl">{subtitle}</p>}
            <div className="w-12 h-1 bg-brand-500 mt-6 rounded-full" />
        </div>
    );
}
