import { cn } from "@/lib/utils";
import { sectionBorder } from "@/lib/styles";

const sizes = {
    md: "section-padding",
    lg: "section-padding-lg",
} as const;

const tones = {
    default: "",
    muted: "bg-slate-50 dark:bg-[#050a14]",
    dark: "bg-[#050b16]",
} as const;

const borders = {
    none: "",
    bottom: "border-b",
    both: "border-y",
} as const;

export interface SectionProps {
    children: React.ReactNode;
    /** Vertical rhythm. `lg` is the marketing default. */
    size?: keyof typeof sizes;
    /**
     * `muted` renders the recessed slate band.
     * `dark` renders the hardcoded near-black band and wraps itself in a
     * `.dark` ancestor so the theme-aware text inside stays readable.
     */
    tone?: keyof typeof tones;
    /** Which horizontal rules to draw, using the shared border token. */
    border?: keyof typeof borders;
    /** Render the `container-xl` wrapper. Defaults to true. */
    container?: boolean;
    /** Extra classes for the container, e.g. `"max-w-3xl mx-auto"`. */
    containerClassName?: string;
    className?: string;
}

/**
 * The band wrapper every marketing section sits in.
 *
 * Handles the three surface tones, the shared hairline border, section
 * padding and the `container-xl` wrapper — the four things every section on
 * the site repeats.
 */
export default function Section({
    children,
    size = "lg",
    tone = "default",
    border = "none",
    container = true,
    containerClassName,
    className,
}: SectionProps) {
    const body = (
        <section
            className={cn(
                sizes[size],
                borders[border],
                border !== "none" && sectionBorder,
                tones[tone],
                className
            )}
        >
            {container ? (
                <div className={cn("container-xl", containerClassName)}>{children}</div>
            ) : (
                children
            )}
        </section>
    );

    // A hardcoded dark background needs the `dark` class on an ancestor, or the
    // theme-aware text inside renders dark-on-dark while the site is in light mode.
    return tone === "dark" ? <div className="dark">{body}</div> : body;
}
