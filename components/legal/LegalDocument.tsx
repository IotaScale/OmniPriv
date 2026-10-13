import React from "react";
import Link from "next/link";
import { Clock, FileText, Mail, Scale, Shield } from "lucide-react";

import { BackToTop, LegalProgress, LegalToc, PrintButton, SectionLink, type TocEntry } from "@/components/legal/LegalChrome";

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
  /** Which document this is, for the Privacy / Terms switcher. */
  kind?: "privacy" | "terms";
  /** Contact address shown in the hero panel. */
  contact?: string;
  /** Callout above the first section. */
  note?: React.ReactNode;
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

/** "3. Fees and Payment" -> ["3", "Fees and Payment"]; unnumbered titles are numbered by position. */
function splitTitle(title: string, index: number): [string, string] {
  const m = title.match(/^(\d+)\.\s+(.*)$/);
  return m ? [m[1], m[2]] : [String(index + 1), title];
}

const DOCS = [
  { kind: "privacy", href: "/privacy-policy", label: "Privacy Policy", icon: Shield },
  { kind: "terms", href: "/terms", label: "Terms of Service", icon: Scale },
] as const;

/**
 * Shared layout for the Privacy Policy and Terms of Service, built to match
 * the redesigned pages: a hero with the dates, summary and an "at a glance"
 * panel, then numbered sections beside a sticky contents list that follows
 * the reader. The legal text itself is passed in unchanged.
 */
export default function LegalDocument({ title, updated, intro, sections, footer, kind, contact, note }: LegalDocumentProps) {
  const toc: TocEntry[] = sections.map((s, i) => {
    const [num, text] = splitTitle(s.title, i);
    return { id: s.id, num, title: text };
  });
  const words = sections.reduce((n, s) => n + s.content.split(/\s+/).length, 0);
  const minutes = Math.max(1, Math.round(words / 220));

  return (
    <div className="aip">
      <LegalProgress targetId="legal-body" />

      {/* Hero */}
      <section className={`relative overflow-hidden border-b ${hairline}`}>
        <div className="aip-hero-grid pointer-events-none absolute inset-0 print:hidden" aria-hidden="true" />
        <div className="container-xl relative pt-12 pb-12 lg:pt-16 lg:pb-16">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,0.75fr)] lg:items-end">
            <div className="min-w-0">
              {kind && (
                <nav aria-label="Legal documents" className="inline-flex rounded-xl border border-slate-900/[0.08] dark:border-white/[0.08] bg-white/80 dark:bg-white/[0.03] p-1 print:hidden">
                  {DOCS.map((d) => {
                    const on = d.kind === kind;
                    return (
                      <Link
                        key={d.kind}
                        href={d.href}
                        aria-current={on ? "page" : undefined}
                        className={`inline-flex h-9 items-center gap-1.5 rounded-lg px-3.5 text-[0.8125rem] font-semibold transition-colors duration-150 ${on ? "bg-[#00B8DB]/[0.12] text-[#00667A] dark:text-[#7FE3F2]" : "text-slate-500 hover:text-[#0a1628] dark:hover:text-white"}`}
                      >
                        <d.icon className="w-3.5 h-3.5" aria-hidden="true" />
                        {d.label}
                      </Link>
                    );
                  })}
                </nav>
              )}
              <h1 className="op-h1 aip-h1 mt-6">{title}</h1>
              <p className="mt-5 text-[0.9375rem] text-slate-500 dark:text-slate-400">{updated}</p>
              {intro && (
                <div className={`mt-6 max-w-[44rem] rounded-2xl border border-[#00B8DB]/25 bg-[#00B8DB]/[0.05] p-5 sm:p-6 ${bodyText}`}>{intro}</div>
              )}
            </div>

            <aside className="min-w-0 rounded-3xl border border-slate-900/[0.08] dark:border-white/[0.08] bg-white dark:bg-[#15171a] p-5 sm:p-6 print:hidden" aria-label="At a glance">
              <div className="op-card-title text-[0.9375rem]">At a glance</div>
              <dl className="mt-4 grid grid-cols-2 gap-3">
                <div className="rounded-xl bg-slate-50 dark:bg-white/[0.03] px-3.5 py-3">
                  <dt className="flex items-center gap-1.5 text-[0.75rem] text-slate-500"><FileText className="w-3.5 h-3.5" aria-hidden="true" /> Sections</dt>
                  <dd className={`mt-1 text-[1.25rem] font-bold tabular-nums ${ink}`}>{sections.length}</dd>
                </div>
                <div className="rounded-xl bg-slate-50 dark:bg-white/[0.03] px-3.5 py-3">
                  <dt className="flex items-center gap-1.5 text-[0.75rem] text-slate-500"><Clock className="w-3.5 h-3.5" aria-hidden="true" /> Reading time</dt>
                  <dd className={`mt-1 text-[1.25rem] font-bold tabular-nums ${ink}`}>{minutes} min</dd>
                </div>
              </dl>
              {contact && (
                <a href={`mailto:${contact}`} className="mt-3 flex items-center gap-2 rounded-xl border border-slate-900/[0.08] dark:border-white/[0.08] px-3.5 py-3 text-[0.875rem] font-semibold op-link hover:border-[#00B8DB]/40 transition-colors">
                  <Mail className="w-4 h-4 shrink-0" aria-hidden="true" />
                  <span className="truncate">{contact}</span>
                </a>
              )}
              <div className="mt-3">
                <PrintButton />
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* Document */}
      <section>
        <div className="container-xl py-12 lg:py-16">
          <div className="grid gap-10 lg:grid-cols-[16rem_minmax(0,1fr)] xl:gap-16">
            <aside className="hidden lg:block print:hidden">
              <div className="sticky top-28 max-h-[calc(100vh-8rem)] overflow-y-auto pr-1">
                <LegalToc items={toc} />
              </div>
            </aside>

            <article id="legal-body" className="min-w-0 max-w-3xl">
              <details className="mb-8 rounded-2xl border border-slate-900/[0.08] dark:border-white/[0.08] bg-slate-50 dark:bg-[#15171a] p-5 lg:hidden print:hidden">
                <summary className="cursor-pointer text-[0.9375rem] font-semibold text-[#0a1628] dark:text-white">Contents · {sections.length} sections</summary>
                <ol className="mt-3 space-y-2">
                  {toc.map((t) => (
                    <li key={t.id} className="grid grid-cols-[1.75rem_minmax(0,1fr)] text-[0.875rem]">
                      <span className="tabular-nums text-slate-400">{t.num}</span>
                      <a href={`#${t.id}`} className="text-slate-600 dark:text-slate-400 hover:text-[#00667A] dark:hover:text-[#7FE3F2]">{t.title}</a>
                    </li>
                  ))}
                </ol>
              </details>

              {note && (
                <div className="mb-4 rounded-2xl border border-amber-500/25 bg-amber-500/[0.05] p-5 sm:p-6 text-[0.9375rem] leading-relaxed text-slate-700 dark:text-slate-300">{note}</div>
              )}

              <div className="space-y-4">
                {sections.map((s, i) => {
                  const t = toc[i];
                  return (
                    <section key={s.id} id={s.id} aria-labelledby={`${s.id}-h`} className="group scroll-mt-28 rounded-3xl border border-slate-900/[0.06] dark:border-white/[0.06] bg-white dark:bg-[#121417] p-6 sm:p-8 print:border-0 print:p-0 print:py-4">
                      <div className="flex items-start gap-4">
                        <span className="inline-flex h-9 min-w-9 shrink-0 items-center justify-center rounded-xl bg-[#00B8DB]/[0.1] px-2 text-[0.875rem] font-bold tabular-nums text-[#00667A] dark:text-[#7FE3F2]" aria-hidden="true">
                          {t.num}
                        </span>
                        <h2 id={`${s.id}-h`} className="op-h3 flex-1 pt-0.5">
                          <span className="sr-only">{t.num}. </span>
                          {t.title}
                        </h2>
                        <SectionLink id={s.id} title={t.title} />
                      </div>
                      <div className="sm:pl-[3.25rem]">{renderBody(s.content)}</div>
                    </section>
                  );
                })}
              </div>

              {footer && (
                <div className="mt-8 flex items-start gap-3 rounded-2xl border border-[#00B8DB]/25 bg-[#00B8DB]/[0.05] p-5 sm:p-6">
                  <Mail className="mt-1 w-5 h-5 shrink-0 text-[#00667A] dark:text-[#7FE3F2]" aria-hidden="true" />
                  <div className={bodyText}>{footer}</div>
                </div>
              )}
            </article>
          </div>
        </div>
      </section>

      <BackToTop />
    </div>
  );
}
