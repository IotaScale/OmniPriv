import { CheckCircle2 } from "lucide-react";

import { cn } from "@/lib/utils";

export interface CheckListProps {
    items: string[];
    className?: string;
}

/**
 * Accent-ticked bullet list used for capability and coverage summaries.
 */
export default function CheckList({ items, className }: CheckListProps) {
    return (
        <ul className={cn("space-y-3", className)}>
            {items.map((item) => (
                <li key={item} className="flex items-start gap-3">
                    <CheckCircle2 className="w-[1.125rem] h-[1.125rem] op-link flex-shrink-0 mt-[0.1875rem]" aria-hidden="true" />
                    <span className="text-[0.9375rem] leading-[1.6] text-slate-700 dark:text-slate-300">{item}</span>
                </li>
            ))}
        </ul>
    );
}
