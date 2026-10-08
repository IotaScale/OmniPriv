import { cn } from "@/lib/utils";

const variants = {
    /** Accent chips for a process or lifecycle. */
    accent:
        "border-[#00B8DB]/25 bg-[#00B8DB]/[0.07] text-sm font-semibold text-[#00667A] dark:text-[#00B8DB]",
    /** Neutral chips for a set of capabilities. */
    neutral:
        "border-slate-900/[0.08] dark:border-white/[0.08] bg-slate-100/60 dark:bg-white/[0.03] text-sm font-medium text-slate-700 dark:text-slate-300",
} as const;

export interface ChipListProps {
    items: string[];
    variant?: keyof typeof variants;
    align?: "center" | "start";
    /**
     * Rendered between chips, pass an arrow icon to express a sequence.
     * Chips are grouped in a flex wrapper only when a separator is present.
     */
    separator?: React.ReactNode;
    className?: string;
}

/**
 * Row of small labelled chips, optionally joined into a flow by a separator.
 */
export default function ChipList({
    items,
    variant = "neutral",
    align = "start",
    separator,
    className,
}: ChipListProps) {
    const chipClass = cn("px-3.5 py-2 rounded-lg border", variants[variant]);

    return (
        <div className={cn("flex flex-wrap gap-2", align === "center" && "items-center", className)}>
            {items.map((item, index) =>
                separator ? (
                    <span key={item} className="flex items-center gap-2">
                        <span className={chipClass}>{item}</span>
                        {index < items.length - 1 && separator}
                    </span>
                ) : (
                    <span key={item} className={chipClass}>
                        {item}
                    </span>
                )
            )}
        </div>
    );
}
