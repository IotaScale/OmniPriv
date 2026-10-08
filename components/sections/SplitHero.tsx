import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { cn } from "@/lib/utils";
import { sectionBorder } from "@/lib/styles";
import MediaSplit from "./MediaSplit";
import type { MediaSplitProps } from "./MediaSplit";

export interface HeroAction {
    href: string;
    label: string;
}

export interface SplitHeroProps {
    titleLead: React.ReactNode;
    /** Rendered in the accent colour at the end of the title. */
    titleAccent?: string;
    /** Kept for existing call sites; eyebrows above headings are no longer rendered. */
    badge?: string;
    primary?: HeroAction;
    secondary?: HeroAction;
    media: {
        src: string;
        alt: string;
        priority?: boolean;
        fit?: "cover" | "contain";
    };
    /** Column split. Use `wide-last` when the media is a product screenshot. */
    ratio?: MediaSplitProps["ratio"];
    /** Frame height. Use `video` for 16:9 images that must not be cropped. */
    height?: MediaSplitProps["height"];
    /** The intro paragraphs, usually `<Prose />` elements. */
    children: React.ReactNode;
    className?: string;
}

/**
 * The interior page hero: a full-width heading above copy and framed
 * photography in two columns.
 *
 * Distinct from the homepage hero, which is a full-bleed slideshow.
 */
export default function SplitHero({
    titleLead,
    titleAccent,
    primary,
    secondary,
    media,
    ratio = "wide-last",
    height = "md",
    children,
    className,
}: SplitHeroProps) {
    return (
        <section className={cn("relative pt-12 pb-16 lg:pt-16 lg:pb-20 border-b", sectionBorder, className)}>
            <div className="container-xl">
                <h1 className="op-h1 mb-8">
                    {titleLead}{" "}
                    {titleAccent && <span className="text-gradient">{titleAccent}</span>}
                </h1>

                <MediaSplit
                    media={{ ...media, priority: true }}
                    ratio={ratio}
                    height={height}
                >
                    <div className="op-hero-copy">
                        <div className="space-y-4">{children}</div>

                        {(primary || secondary) && (
                            <div className="mt-8 flex flex-col sm:flex-row gap-3">
                                {primary && (
                                    <Link href={primary.href} className="btn-primary w-full sm:w-auto">
                                        {primary.label}
                                        <ArrowRight className="w-4 h-4" aria-hidden="true" />
                                    </Link>
                                )}

                                {secondary && (
                                    <Link href={secondary.href} className="btn-secondary w-full sm:w-auto">
                                        {secondary.label}
                                        <ArrowRight className="w-4 h-4" aria-hidden="true" />
                                    </Link>
                                )}
                            </div>
                        )}
                    </div>
                </MediaSplit>
            </div>
        </section>
    );
}
