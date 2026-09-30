import { cn } from "@/lib/utils";
import { cardBorder, cardSurface, displayFont, prose } from "@/lib/styles";
import Section from "./Section";
import SectionHeading from "./SectionHeading";

export interface FaqEntry {
    question: string;
    /** A single paragraph. */
    answer: string;
}

export interface FaqSectionProps {
    title: string;
    subtitle?: string;
    items: FaqEntry[];
    /** Emit `FAQPage` structured data for this block. Defaults to true. */
    emitSchema?: boolean;
    className?: string;
}

/**
 * Question-and-answer block on the recessed band.
 *
 * Answers are always visible (no accordion), so the block is a server
 * component and ships no client JavaScript.
 */
export default function FaqSection({
    title,
    subtitle,
    items,
    emitSchema = true,
    className,
}: FaqSectionProps) {
    const schema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: items.map((item) => ({
            "@type": "Question",
            name: item.question,
            acceptedAnswer: { "@type": "Answer", text: item.answer },
        })),
    };

    return (
        <Section tone="muted" border="bottom" container={false} className={className}>
            {emitSchema && (
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
                />
            )}

            <div className="container-xl max-w-3xl mx-auto">
                <SectionHeading
                    title={title}
                    align="center"
                    size="lg"
                    className="mb-12"
                >
                    {subtitle && <p className={prose}>{subtitle}</p>}
                </SectionHeading>

                <div className="space-y-4">
                    {items.map((item) => (
                        <div
                            key={item.question}
                            className={cn("rounded-2xl border p-6", cardBorder, cardSurface)}
                        >
                            <h3
                                className="text-lg font-bold text-slate-950 dark:text-white mb-3 tracking-tight"
                                style={displayFont}
                            >
                                {item.question}
                            </h3>

                            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                                {item.answer}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </Section>
    );
}
