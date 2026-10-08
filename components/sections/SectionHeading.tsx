import { cn } from "@/lib/utils";

const sizes = {
    /** Section heading (`.op-h2`). */
    md: "op-h2",
    /** Same scale; kept as an alias for existing call sites. */
    lg: "op-h2",
    /** Sub-section heading inside a section that already has an `h2`. */
    sm: "op-h3",
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
 * Heading, then subheading, then content: the order every section on the
 * site follows. Headings sit on the left everywhere, matching the homepage.
 *
 * `badge` and `align` are still accepted so existing call sites compile, but
 * neither renders: eyebrow pills above headings and centred heading blocks
 * were dropped for one consistent reading order.
 */
export default function SectionHeading({
    title,
    as: Tag = "h2",
    size = "md",
    className,
    titleClassName,
    children,
}: SectionHeadingProps) {
    return (
        // `section-heading` is the hook for the shared lede styles in globals.css.
        <div
            className={cn("section-heading", className?.replace(/\bmx-auto\b/g, ""))}
            data-aos="fade-up"
        >
            <Tag className={cn(Tag === "h3" ? "op-h3" : sizes[size], titleClassName)}>
                {title}
            </Tag>

            {children}
        </div>
    );
}
