import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { cn } from "@/lib/utils";
import { darkSurface, displayFont } from "@/lib/styles";

export interface CtaBandAction {
    href: string;
    label: string;
}

export interface CtaBandProps {
    title: React.ReactNode;
    /** Badge above the title. */
    badge?: string;
    /** Supporting paragraphs. The last one carries the larger bottom margin. */
    body?: string[];
    /** Emphasised sentence directly above the buttons. */
    kicker?: React.ReactNode;
    primary: CtaBandAction;
    /** Rendered without an arrow. */
    secondary?: CtaBandAction;
    children?: React.ReactNode;
    className?: string;
}

/**
 * Full-width closing call to action on the hardcoded dark surface.
 *
 * Wraps itself in `.dark` so the theme-aware text stays readable in light
 * mode. Distinct from the homepage's rounded `ClosingCtaSection` card.
 */
export default function CtaBand({
    title,
    badge,
    body,
    kicker,
    primary,
    secondary,
    children,
    className,
}: CtaBandProps) {
    return (
        <div className="dark">
            <section
                className={cn(
                    "section-padding border-b border-white/[0.04]",
                    darkSurface,
                    className
                )}
            >
                <div className="container-xl max-w-4xl mx-auto text-center" data-aos="fade-up">
                    {badge && <div className="badge-cyan mb-6 inline-flex mx-auto">{badge}</div>}

                    <h2
                        className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-950 dark:text-white mb-6 tracking-tight"
                        style={displayFont}
                    >
                        {title}
                    </h2>

                    {body?.map((paragraph, index) => (
                        <p
                            key={index}
                            className={cn(
                                "text-slate-600 dark:text-slate-400 text-lg leading-relaxed",
                                index === body.length - 1 ? "mb-10" : "mb-4"
                            )}
                        >
                            {paragraph}
                        </p>
                    ))}

                    {kicker && (
                        <p className="text-slate-950 dark:text-white font-semibold text-lg mb-6">
                            {kicker}
                        </p>
                    )}

                    <div className="flex flex-col sm:flex-row justify-center gap-3.5">
                        <Link href={primary.href} className="btn-primary text-base px-8 py-3.5">
                            {primary.label}
                            <ArrowRight className="w-5 h-5 ml-1.5" />
                        </Link>

                        {secondary && (
                            <Link href={secondary.href} className="btn-secondary text-base px-8 py-3.5">
                                {secondary.label}
                            </Link>
                        )}
                    </div>

                    {children}
                </div>
            </section>
        </div>
    );
}
