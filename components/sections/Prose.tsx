import { Fragment } from "react";
import Link from "next/link";

import { cn } from "@/lib/utils";
import { accentLink, prose, proseKicker, proseStrong } from "@/lib/styles";
import type { RichText } from "@/lib/rich-text";

const tones = {
    /** Default body copy. */
    muted: prose,
    /** Lead-in sentence above a list or chip row. */
    strong: proseStrong,
    /** Emphasised sentence directly above a call to action. */
    kicker: proseKicker,
    /** No colour or weight applied. */
    none: "",
} as const;

export interface ProseProps {
    segments: RichText;
    tone?: keyof typeof tones;
    /** Extra classes, e.g. `"text-lg mb-5"` or `"max-w-3xl mt-10"`. */
    className?: string;
}

/**
 * Renders a paragraph from data.
 *
 * Plain strings render as text; `{ text, href }` segments render as inline
 * accent links. `tone` selects the text treatment rather than relying on
 * class-order overrides, which avoids accidentally inheriting a line-height
 * that the source paragraph did not have.
 */
export default function Prose({ segments, tone = "muted", className }: ProseProps) {
    return (
        <p className={cn(tones[tone], className)}>
            {segments.map((segment, index) =>
                typeof segment === "string" ? (
                    <Fragment key={index}>{segment}</Fragment>
                ) : (
                    <Link key={index} href={segment.href} className={accentLink}>
                        {segment.text}
                    </Link>
                )
            )}
        </p>
    );
}
