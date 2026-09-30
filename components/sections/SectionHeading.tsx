import { cn } from "@/lib/utils";
import { displayFont } from "@/lib/styles";

const sizes = {
    /** Section headings that sit above body copy. */
    md: "text-3xl md:text-4xl mb-5",
    /** Headings that introduce a centred block. */
    lg: "text-3xl sm:text-4xl mb-4",
    /** Sub-section heading inside a section that already has an `h2`. */
    sm: "text-xl md:text-2xl mb-4",
} as const;

export interface SectionHeadingProps {
    title: React.ReactNode;
    /** Eyebrow pill above the title. */
    badge?: string;
    /** Heading level. Use `h3` for sub-sections. */
    as?: "h2" | "h3";
    align?: "left" | "center";
    size?: keyof typeof sizes;
    /** Extra classes for the wrapper, e.g. `"max-w-3xl mb-12"`. */
    className?: string;
    /** Extra classes appended to the heading. */
    titleClassName?: string;
    /** Body copy rendered under the title. */
    children?: React.ReactNode;
}

/**
 * Badge + `h2` + intro copy — the heading rhythm shared by every section.
 */
export default function SectionHeading({
    title,
    badge,
    as: Tag = "h2",
    align = "left",
    size = "md",
    className,
    titleClassName,
    children,
}: SectionHeadingProps) {
    const centered = align === "center";

    return (
        <div className={cn(centered && "text-center", className)}>
            {badge && (
                <div className={cn("badge-cyan mb-5 inline-flex", centered && "mx-auto")}>
                    {badge}
                </div>
            )}

            <Tag
                className={cn(
                    Tag === "h3" ? "font-bold" : "font-extrabold",
                    "text-slate-950 dark:text-white tracking-tight",
                    sizes[size],
                    titleClassName
                )}
                style={displayFont}
            >
                {title}
            </Tag>

            {children}
        </div>
    );
}
