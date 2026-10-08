import Link from "next/link";
import { ArrowRight, type LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { cardBorder, cardSurface } from "@/lib/styles";

const columns = {
    2: "sm:grid-cols-2",
    3: "sm:grid-cols-2 lg:grid-cols-3",
    4: "sm:grid-cols-2 lg:grid-cols-4",
} as const;

export interface IconCard {
    icon: LucideIcon;
    title: string;
    text: string;
    /** Small mono label above the title, e.g. the name of a control. */
    eyebrow?: string;
    /** When set, the whole card becomes a link and gains a trailing arrow. */
    href?: string;
}

export interface IconCardGridProps {
    items: IconCard[];
    columns?: keyof typeof columns;
    className?: string;
}

/**
 * Responsive grid of icon cards, used for personas, capabilities and any
 * other "here are N things" block.
 *
 * Cards without an `href` are static; cards with one become links, which is
 * what a hub page needs when the grid doubles as navigation.
 */
export default function IconCardGrid({ items, columns: cols = 4, className }: IconCardGridProps) {
    return (
        // Animated on the container, not the cards: the cards lift on hover and
        // AOS leaves a transform behind that would out-specify it.
        <div className={cn("grid gap-5", columns[cols], className)} data-aos="fade-up">
            {items.map((item) => {
                const cardClass = cn(
                    "group flex flex-col rounded-2xl border p-6 transition-colors duration-200",
                    "hover:border-[#00B8DB]/45",
                    cardBorder,
                    cardSurface
                );

                const body = (
                    <>
                        <div className="icon-wrapper mb-5">
                            <item.icon className="w-5 h-5" />
                        </div>

                        {item.eyebrow && !/^\d+$/.test(item.eyebrow) && (
                            <div className="text-xs font-semibold op-link mb-1.5">
                                {item.eyebrow}
                            </div>
                        )}

                        <h3 className="op-card-title mb-2">
                            {item.title}
                        </h3>

                        <p className="op-card-text flex-1">
                            {item.text}
                        </p>

                        {item.href && (
                            <span className="op-link mt-5 inline-flex items-center gap-1.5 text-sm font-semibold">
                                Learn more
                                <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden="true" />
                            </span>
                        )}
                    </>
                );

                return item.href ? (
                    <Link key={item.title} href={item.href} className={cardClass}>
                        {body}
                    </Link>
                ) : (
                    <div key={item.title} className={cardClass}>
                        {body}
                    </div>
                );
            })}
        </div>
    );
}
