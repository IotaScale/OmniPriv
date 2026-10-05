import Image from "next/image";

import { cn } from "@/lib/utils";
import { mediaBorder } from "@/lib/styles";

const ratios = {
    /** 50/50 columns. */
    even: "lg:grid-cols-2",
    /** Text column takes slightly more room than the image. */
    "wide-first": "lg:grid-cols-[1.15fr_1fr]",
    /** Image column takes slightly more room than the text. */
    "wide-last": "lg:grid-cols-[1fr_1.15fr]",
} as const;

/**
 * Image frames all share one aspect ratio so imagery is the same size and
 * shape on every page, and a frame can never crop its source. The names below
 * are aliases kept because existing call sites select between them.
 */
const heights = {
    sm: "aspect-video",
    md: "aspect-video",
    video: "aspect-video",
} as const;

export interface MediaSplitProps {
    media: {
        src: string;
        alt: string;
        priority?: boolean;
        sizes?: string;
    };
    /** The text column. */
    children: React.ReactNode;
    ratio?: keyof typeof ratios;
    height?: keyof typeof heights;
    align?: "center" | "start";
    /** Put the media column first in the DOM (stacks above on mobile). */
    reverse?: boolean;
    className?: string;
}

/**
 * Two-column section: copy beside framed photography.
 *
 * Collapses to a single column below `lg`, with the text first.
 */
export default function MediaSplit({
    media,
    children,
    ratio = "even",
    height = "sm",
    align = "center",
    reverse = false,
    className,
}: MediaSplitProps) {
    const frame = (
        <div
            className={cn(
                "relative w-full rounded-2xl overflow-hidden border",
                mediaBorder,
                heights[height]
            )}
        >
            <Image
                src={media.src}
                alt={media.alt}
                fill
                priority={media.priority}
                sizes={media.sizes ?? "(max-width: 1024px) 100vw, 560px"}
                className="object-cover"
            />
        </div>
    );

    return (
        <div
            className={cn(
                "grid gap-12 lg:gap-16",
                ratios[ratio],
                align === "center" && "items-center",
                className
            )}
        >
            {reverse && frame}
            <div>{children}</div>
            {!reverse && frame}
        </div>
    );
}
