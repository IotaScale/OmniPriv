import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { cn } from "@/lib/utils";

export interface ArrowLinkProps {
    href: string;
    children: React.ReactNode;
    /** Extra classes, usually spacing such as `"mt-8"`. */
    className?: string;
}

/**
 * Standalone "Explore X →" link used to close out a section.
 *
 * The arrow slides on hover. Matches the links on the homepage identity cards.
 */
export default function ArrowLink({ href, children, className }: ArrowLinkProps) {
    return (
        <Link
            href={href}
            className={cn(
                "inline-flex items-center gap-2 text-sm font-semibold text-[#00B8FF] hover:gap-3 transition-all",
                className
            )}
        >
            {children}
            <ArrowRight className="w-4 h-4" />
        </Link>
    );
}
