import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { cn } from "@/lib/utils";
import { displayFont, sectionBorder } from "@/lib/styles";
import MediaSplit from "./MediaSplit";

export interface HeroAction {
    href: string;
    label: string;
}

export interface SplitHeroProps {
    titleLead: React.ReactNode;
    /** Rendered in the accent colour at the end of the title. */
    titleAccent?: string;
    badge: string;
    primary: HeroAction;
    secondary?: HeroAction;
    media: {
        src: string;
        alt: string;
        priority?: boolean;
    };
    /** The intro paragraphs, usually `<Prose />` elements. */
    children: React.ReactNode;
    className?: string;
}

/**
 * The interior page hero: copy on the left, framed photography on the right.
 *
 * Distinct from the homepage hero, which is a full-bleed slideshow.
 */
export default function SplitHero({
    titleLead,
    titleAccent,
    badge,
    primary,
    secondary,
    media,
    children,
    className,
}: SplitHeroProps) {
    return (
        <section className={cn("relative pt-16 pb-20 border-b overflow-hidden", sectionBorder, className)}>
            {/* Dot grid */}
            <div className="absolute inset-0 bg-grid opacity-50" />
            {/* Fade into the page below */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white dark:to-[#030711]" />
            {/* Accent glow */}
            <div
                className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[520px] pointer-events-none"
                style={{
                    background: "radial-gradient(ellipse, rgba(0,184,255,0.08) 0%, transparent 65%)",
                }}
            />

            <div className="container-xl relative z-10">
                <MediaSplit
                    media={{ ...media, priority: true }}
                    ratio="wide-first"
                    height="md"
                >
                    <div>
                        <div className="badge-cyan mb-6 inline-flex">{badge}</div>

                        <h1
                            className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-slate-950 dark:text-white mb-6 leading-tight tracking-tight"
                            style={displayFont}
                        >
                            {titleLead}{" "}
                            {titleAccent && <span className="text-gradient">{titleAccent}</span>}
                        </h1>

                        {children}

                        <div className="flex flex-col sm:flex-row gap-3.5">
                            <Link
                                href={primary.href}
                                className="btn-primary text-base px-7 py-3.5 w-full sm:w-auto text-center"
                            >
                                {primary.label}
                                <ArrowRight className="w-5 h-5 ml-1.5" />
                            </Link>

                            {secondary && (
                                <Link
                                    href={secondary.href}
                                    className="btn-secondary text-base px-7 py-3.5 w-full sm:w-auto text-center"
                                >
                                    {secondary.label}
                                    <ArrowRight className="w-5 h-5 ml-1.5" />
                                </Link>
                            )}
                        </div>
                    </div>
                </MediaSplit>
            </div>
        </section>
    );
}
