

import FaqAccordion, { type FaqEntry } from "./FaqAccordion";
import Section from "./Section";

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
        <Section border="bottom" container={false} className={className}>
            {emitSchema && (
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
                />
            )}

            {/* Same layout as the homepage FAQ: centred heading over the accordion. */}
            <div className="container-xl max-w-4xl mx-auto">
                <div className="text-center mb-10 lg:mb-12" data-aos="fade-up">
                    <h2 className="op-h2">{title}</h2>
                    {subtitle && <p className="op-lede mx-auto">{subtitle}</p>}
                </div>

                <FaqAccordion items={items} />
            </div>
        </Section>
    );
}
