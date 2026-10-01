import { cn } from "@/lib/utils";
import { prose } from "@/lib/styles";
import FaqAccordion, { type FaqEntry } from "./FaqAccordion";
import Section from "./Section";
import SectionHeading from "./SectionHeading";

export type { FaqEntry };

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
 * The list itself is the closeable accordion from the homepage; this wrapper
 * only supplies the band, the heading and the FAQPage structured data. Those
 * stay server-rendered even though the accordion is a client component.
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
            acceptedAnswer: {
                "@type": "Answer",
                text: Array.isArray(item.answer) ? item.answer.join(" ") : item.answer,
            },
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

            <div className="container-xl max-w-4xl mx-auto">
                <SectionHeading
                    title={title}
                    align="center"
                    size="lg"
                    className="mb-12 sm:mb-16"
                    titleClassName="md:text-5xl leading-tight"
                >
                    {subtitle && (
                        <p className={cn(prose, "text-base sm:text-lg max-w-2xl mx-auto")}>
                            {subtitle}
                        </p>
                    )}
                </SectionHeading>

                <FaqAccordion items={items} />
            </div>
        </Section>
    );
}
