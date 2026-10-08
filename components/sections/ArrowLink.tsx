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
                "group op-link inline-flex items-center gap-1.5 text-sm font-semibold underline-offset-4 hover:underline",
                className
            )}
        >
            {children}
            <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden="true" />
        </Link>
    );
}
