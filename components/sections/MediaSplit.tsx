import Image from "next/image";

import { cn } from "@/lib/utils";
import { mediaBorder } from "@/lib/styles";

const ratios = {
    /** 50/50 columns. */
    even: "lg:grid-cols-2",
    /** Text column takes slightly more room than the image. */
    "wide-first": "lg:grid-cols-[1.15fr_1fr]",
} as const;

const heights = {
    sm: "h-64 sm:h-80 lg:h-[400px]",
    md: "h-64 sm:h-80 lg:h-[420px]",
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
