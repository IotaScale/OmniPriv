import React from "react";
import MediaSplit from "@/components/sections/MediaSplit";

export interface LegalSection {
  id: string;
  title: string;
  /**
   * Plain text. Blank lines separate blocks; lines starting with "- " form a
   * list; a short line directly above a list (not ending in ":") becomes a
   * subheading; `**bold**` and email addresses are rendered inline.
   */
  content: string;
}

export interface LegalDocumentProps {
  title: string;
  /** The "Last updated" line under the title. */
  updated: React.ReactNode;
  /** Optional note above the first section. */
  intro?: React.ReactNode;
  sections: LegalSection[];
  /** Closing line under the last section. */
  footer?: React.ReactNode;
}

const ink = "text-[#0a1628] dark:text-white";
const bodyText = "text-base leading-[1.75] text-slate-600 dark:text-slate-400";
const hairline = "border-slate-900/[0.06] dark:border-white/[0.06]";

/** `**bold**` and email addresses. */
function renderInline(text: string): React.ReactNode[] {
  return text
    .split(/(\*\*[^*]+\*\*|[\w.+-]+@[\w-]+\.[\w.]+[a-z])/gi)
    .filter(Boolean)
    .map((part, i) => {
      const bold = part.match(/^\*\*([^*]+)\*\*$/);
      if (bold) {
        return (
          <strong key={i} className={`font-semibold ${ink}`}>
            {bold[1]}
          </strong>
        );
      }
      if (/^[\w.+-]+@[\w-]+\.[\w.]+[a-z]$/i.test(part)) {
        return (
          <a key={i} href={`mailto:${part}`} className="op-link font-semibold hover:underline underline-offset-2">
            {part}
          </a>
        );
      }
      return <React.Fragment key={i}>{part}</React.Fragment>;
    });
}

/** A short "Label:" lead-in (list items, "Waiver: ..." paragraphs) is set in the ink colour. */
function renderItem(text: string): React.ReactNode {
  const colon = text.indexOf(": ");
  if (colon > 0 && colon <= 40) {
    return (
      <>
        <span className={`font-semibold ${ink}`}>{text.slice(0, colon + 1)}</span>
        {renderInline(text.slice(colon + 1))}
      </>
    );
  }
  return renderInline(text);
}

function renderBody(content: string): React.ReactNode[] {
  const nodes: React.ReactNode[] = [];

  content.split(/\n\s*\n/).forEach((block, b) => {
    const lines = block.split("\n").map((l) => l.trim()).filter(Boolean);
    let i = 0;

    while (i < lines.length) {
      if (lines[i].startsWith("- ")) {
        const items: string[] = [];
        while (i < lines.length && lines[i].startsWith("- ")) {
          items.push(lines[i].slice(2));
          i++;
        }
        nodes.push(
          <ul
            key={`${b}-${i}-ul`}
            className={`mt-4 space-y-2.5 pl-5 list-disc marker:text-[#00667A] dark:marker:text-[#00B8DB] ${bodyText}`}
          >
            {items.map((item, k) => (
              <li key={k} className="pl-1">
                {renderItem(item)}
              </li>
            ))}
          </ul>
        );
        continue;
      }

      const text: string[] = [];
      while (i < lines.length && !lines[i].startsWith("- ")) {
        text.push(lines[i]);
        i++;
      }

      const leadsList = i < lines.length;
      const last = text[text.length - 1];
      const isSubheading = leadsList && !last.endsWith(":") && last.length <= 60;
      const paragraph = isSubheading ? text.slice(0, -1) : text;

      if (paragraph.length > 0) {
        nodes.push(
          <p key={`${b}-${i}-p`} className={`mt-4 ${bodyText}`}>
            {paragraph.map((line, k) => (
              <React.Fragment key={k}>
                {k > 0 && <br />}
                {renderItem(line)}
              </React.Fragment>
            ))}
          </p>
        );
      }

      if (isSubheading) {
        nodes.push(
          <h3 key={`${b}-${i}-h3`} className={`mt-6 text-base font-semibold leading-snug ${ink}`}>
            {last}
          </h3>
        );
      }
    }
  });

  return nodes;
}

/**
 * Shared layout for the Privacy Policy and Terms of Service: a left-aligned
 * hero with a full-width title above the updated line and intro beside an
 * image, followed by a sticky contents list from lg and readable article.
 */
export default function LegalDocument({ title, updated, intro, sections, footer }: LegalDocumentProps) {
  return (
    <>
      {/* Hero */}
      <section className={`pt-12 pb-16 lg:pt-16 lg:pb-20 border-b ${hairline}`}>
        <div className="container-xl">
          <h1 className="op-h1 mb-8">{title}</h1>
          <MediaSplit
            media={{
              src: "/product/compliance.png",
              alt: "OmniPriv compliance dashboard showing security controls",
              fit: "contain",
            }}
            ratio="wide-last"
            height="md"
          >
            <div>
              <p className="text-sm text-slate-500 dark:text-slate-400">{updated}</p>
              {intro && (
                <div
                  className={`mt-5 rounded-2xl border border-slate-900/[0.08] dark:border-white/[0.08] bg-slate-50 dark:bg-[#0F2140] p-6 ${bodyText}`}
                >
                  {intro}
                </div>
              )}
            </div>
          </MediaSplit>
        </div>
      </section>

      {/* Content */}
      <section className="section-padding">
        <div className="container-xl">
          <div className="grid gap-12 lg:grid-cols-[14rem_minmax(0,1fr)] xl:gap-16">
            {/* Table of contents */}
            <nav aria-label="Contents" className="hidden lg:block">
              <div className="sticky top-28">
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-3">
                  Contents
                </p>
                <ul className={`border-l ${hairline}`}>
                  {sections.map((s) => (
                    <li key={s.id}>
                      <a
                        href={`#${s.id}`}
                        className="-ml-px block border-l border-transparent py-1.5 pl-4 text-sm leading-snug text-slate-600 dark:text-slate-400 hover:text-[#0a1628] dark:hover:text-white hover:border-[#00B8DB] transition-colors"
                      >
                        {s.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </nav>

            {/* Document */}
            <article className="max-w-3xl min-w-0">
              <div className="divide-y divide-slate-900/[0.06] dark:divide-white/[0.06]">
                {sections.map((s) => (
                  <div key={s.id} id={s.id} className="scroll-mt-28 py-10 first:pt-0">
                    <h2 className="op-h3">{s.title}</h2>
                    {renderBody(s.content)}
                  </div>
                ))}
              </div>

              {footer && (
                <div className={`pt-8 border-t ${hairline} ${bodyText}`}>{footer}</div>
              )}
            </article>
          </div>
        </div>
      </section>
    </>
  );
}
