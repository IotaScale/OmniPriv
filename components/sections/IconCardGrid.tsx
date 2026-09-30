import type { LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { cardBorder, cardSurface, displayFont } from "@/lib/styles";

const columns = {
    2: "sm:grid-cols-2",
    3: "sm:grid-cols-2 lg:grid-cols-3",
    4: "sm:grid-cols-2 lg:grid-cols-4",
} as const;

export interface IconCard {
    icon: LucideIcon;
    title: string;
    text: string;
}

export interface IconCardGridProps {
    items: IconCard[];
    columns?: keyof typeof columns;
    className?: string;
}

/**
 * Responsive grid of icon cards — used for personas, capabilities and any
 * other "here are N things" block.
 */
export default function IconCardGrid({ items, columns: cols = 4, className }: IconCardGridProps) {
    return (
        <div className={cn("grid gap-5", columns[cols], className)}>
            {items.map((item) => (
                <div
                    key={item.title}
                    className={cn(
                        "group flex flex-col rounded-2xl border p-6 transition-all duration-300",
                        "hover:-translate-y-1 hover:border-[#00B8FF]/40",
                        cardBorder,
                        cardSurface
                    )}
                >
                    <div className="icon-wrapper mb-5">
                        <item.icon className="w-5 h-5" />
                    </div>

                    <h3
                        className="text-lg font-bold text-slate-950 dark:text-white mb-2.5 tracking-tight"
                        style={displayFont}
                    >
                        {item.title}
                    </h3>

                    <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                        {item.text}
                    </p>
                </div>
            ))}
        </div>
    );
}
