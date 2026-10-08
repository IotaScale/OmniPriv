import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { cn } from "@/lib/utils";

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
    body,
    kicker,
    primary,
    secondary,
    children,
    className,
}: CtaBandProps) {
    return (
        <div className="dark">
            <section className={cn("op-band-navy section-padding", className)}>
                <div className="container-xl max-w-3xl mx-auto text-center" data-aos="fade-up">
                    <h2 className="op-h2 op-h2-lg">{title}</h2>

                    {body?.map((paragraph, index) => (
                        <p
                            key={index}
                            className={cn(
                                "mx-auto max-w-2xl text-base sm:text-[1.0625rem] leading-[1.7] text-slate-400",
                                index === 0 ? "mt-5" : "mt-3"
                            )}
                        >
                            {paragraph}
                        </p>
                    ))}

                    {kicker && <p className="mt-6 text-white font-semibold">{kicker}</p>}

                    <div className="mt-8 flex flex-col sm:flex-row justify-center gap-3">
                        <Link href={primary.href} className="btn-primary">
                            {primary.label}
                            <ArrowRight className="w-4 h-4" aria-hidden="true" />
                        </Link>

                        {secondary && (
                            <Link href={secondary.href} className="btn-secondary">
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
