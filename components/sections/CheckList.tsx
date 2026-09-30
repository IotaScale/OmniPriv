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
        <ul className={cn("space-y-2.5", className)}>
            {items.map((item) => (
                <li key={item} className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#00B8FF] flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-slate-700 dark:text-slate-300">{item}</span>
                </li>
            ))}
        </ul>
    );
}
