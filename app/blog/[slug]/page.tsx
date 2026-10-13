import type { Metadata } from "next";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound, permanentRedirect } from "next/navigation";
import { ArrowLeft, ArrowRight, Clock, Calendar, Tag, ChevronRight } from "lucide-react";

import { ArticleToc, ReadingProgress, ShareRow, type TocItem } from "@/components/blog/ArticleChrome";
import { ClosingBand, sectionLine } from "@/components/pageui/blocks";
import { posts } from "@/lib/blog-data";
import { getCover } from "@/lib/blog-covers";
import { mediaBorder } from "@/lib/styles";

/* ─── ARTICLE STYLES ────────────────────────────────── */

const ink = "text-[#0a1628] dark:text-white";
const articleText = "text-[1.0625rem] leading-[1.8] text-slate-700 dark:text-slate-300";
const articleH2 = `mt-12 first:mt-0 text-2xl font-bold leading-[1.25] tracking-[-0.02em] ${ink}`;
const articleH3 = `mt-9 first:mt-0 text-xl font-bold leading-[1.3] tracking-[-0.015em] ${ink}`;
const articleList = `mt-5 first:mt-0 space-y-2.5 pl-6 marker:text-[#00667A] dark:marker:text-[#00B8DB] ${articleText}`;
const articleLink = "op-link font-semibold underline-offset-2 hover:underline";

/* ─── HEADING ANCHORS ───────────────────────────────── */

/** Plain text of an inline-markdown heading, for anchors and the TOC. */
function plain(text: string): string {
  return text.replace(/\[([^\]]+)\]\([^)]+\)/g, "$1").replace(/\*\*|`/g, "").trim();
}

function slugify(text: string): string {
  return plain(text).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 80);
}

/** One id per heading, de-duplicated in document order. */
function headingIds(markdown: string): TocItem[] {
  const seen = new Map<string, number>();
  const out: TocItem[] = [];
  let inCode = false;
  for (const raw of markdown.split("\n")) {
    const line = raw.trim();
    if (line.startsWith("```")) inCode = !inCode;
    if (inCode) continue;
    const m = line.match(/^(#{2,4})\s+(.*)$/);
    if (!m) continue;
    const base = slugify(m[2]) || "section";
    const n = seen.get(base) ?? 0;
    seen.set(base, n + 1);
    out.push({ id: n ? `${base}-${n + 1}` : base, text: plain(m[2]), level: m[1] === "##" ? 2 : 3 });
  }
  return out;
}

/* ─── INLINE MARKDOWN RENDERER ─────────────────────── */

/** `[text](url)`, `**bold**` and `` `code` ``. */
function renderInline(text: string): React.ReactNode {
  const parts = text.split(/(\[[^\]]+\]\([^)]+\)|\*\*[^*]+\*\*|`[^`]+`)/g).filter(Boolean);
  return parts.map((part, i) => {
    const link = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (link) {
      return (
        <Link key={i} href={link[2]} className={articleLink}>
          {link[1]}
        </Link>
      );
    }
    const bold = part.match(/^\*\*([^*]+)\*\*$/);
    if (bold) {
      return (
        <strong key={i} className={`font-semibold ${ink}`}>
          {renderInline(bold[1])}
        </strong>
      );
    }
    const code = part.match(/^`([^`]+)`$/);
    if (code) {
      return (
        <code
          key={i}
          className="rounded-md bg-slate-100 dark:bg-white/[0.06] px-1.5 py-0.5 font-mono text-[0.875em] text-[#0a1628] dark:text-slate-200"
        >
          {code[1]}
        </code>
      );
    }
    return <React.Fragment key={i}>{part}</React.Fragment>;
  });
}

/* ─── BLOCK MARKDOWN RENDERER ───────────────────────── */

/**
 * Line-based renderer for the subset of Markdown the posts use: `##`/`###`
 * headings, paragraphs, `- ` and `1. ` lists, `![alt](src)` images, `> `
 * quotes and fenced code. A heading or list may sit directly on the line
 * above or below a paragraph without a blank line between them.
 */
function renderArticle(markdown: string, toc: TocItem[]): React.ReactNode[] {
  const lines = markdown.trim().split("\n");
  const nodes: React.ReactNode[] = [];
  let i = 0;
  let h = 0;

  const isBlockStart = (line: string) =>
    /^(#{2,4} |- |\d+\. |> |```|!\[)/.test(line.trim());

  while (i < lines.length) {
    const line = lines[i].trim();
    const key = `b${i}`;

    if (!line) {
      i++;
      continue;
    }

    // Fenced code
    if (line.startsWith("```")) {
      const code: string[] = [];
      i++;
      while (i < lines.length && !lines[i].trim().startsWith("```")) {
        code.push(lines[i]);
        i++;
      }
      i++;
      nodes.push(
        <pre
          key={key}
          className="mt-6 first:mt-0 overflow-x-auto rounded-xl border border-slate-900/[0.08] dark:border-white/[0.08] bg-slate-50 dark:bg-[#15171A] p-4 font-mono text-sm leading-[1.7] text-[#0a1628] dark:text-slate-200"
        >
          <code>{code.join("\n")}</code>
        </pre>
      );
      continue;
    }

    // Headings
    const heading = line.match(/^(#{2,4})\s+(.*)$/);
    if (heading) {
      const id = toc[h++]?.id;
      nodes.push(
        heading[1] === "##" ? (
          <h2 key={key} id={id} className={`${articleH2} scroll-mt-28`}>
            {renderInline(heading[2])}
          </h2>
        ) : (
          <h3 key={key} id={id} className={`${articleH3} scroll-mt-28`}>
            {renderInline(heading[2])}
          </h3>
        )
      );
      i++;
      continue;
    }

    // Image
    const image = line.match(/^!\[(.+?)\]\((.+?)\)$/);
    if (image) {
      nodes.push(
        <figure key={key} className={`mt-8 mb-2 first:mt-0 rounded-2xl overflow-hidden border ${mediaBorder}`}>
          <Image
            src={image[2]}
            alt={image[1]}
            width={820}
            height={420}
            className="w-full h-auto"
            unoptimized
          />
        </figure>
      );
      i++;
      continue;
    }

    // Lists
    if (/^(- |\d+\. )/.test(line)) {
      const ordered = /^\d+\. /.test(line);
      const pattern = ordered ? /^\d+\.\s+/ : /^-\s+/;
      const items: string[] = [];
      while (i < lines.length && pattern.test(lines[i].trim())) {
        items.push(lines[i].trim().replace(pattern, ""));
        i++;
      }
      const ListTag = ordered ? "ol" : "ul";
      nodes.push(
        <ListTag key={key} className={`${articleList} ${ordered ? "list-decimal" : "list-disc"}`}>
          {items.map((item, k) => (
            <li key={k} className="pl-1.5">
              {renderInline(item)}
            </li>
          ))}
        </ListTag>
      );
      continue;
    }

    // Blockquote
    if (line.startsWith("> ")) {
      const quote: string[] = [];
      while (i < lines.length && lines[i].trim().startsWith(">")) {
        quote.push(lines[i].trim().replace(/^>\s?/, ""));
        i++;
      }
      nodes.push(
        <blockquote
          key={key}
          className={`mt-6 first:mt-0 border-l-2 border-[#00667A] dark:border-[#00B8DB] pl-5 italic ${articleText}`}
        >
          {renderInline(quote.join(" "))}
        </blockquote>
      );
      continue;
    }

    // Paragraph: consecutive plain lines. A line that is bold on its own
    // (a lead-in or an FAQ question) keeps its own line.
    const para: string[] = [];
    while (i < lines.length && lines[i].trim() && !isBlockStart(lines[i])) {
      para.push(lines[i].trim());
      i++;
    }
    nodes.push(
      <p key={key} className={`mt-5 first:mt-0 ${articleText}`}>
        {para.map((text, k) => (
          <React.Fragment key={k}>
            {k > 0 && (/^\*\*.+\*\*:?$/.test(para[k - 1]) ? <br /> : " ")}
            {renderInline(text)}
          </React.Fragment>
        ))}
      </p>
    );
  }

  return nodes;
}

/* ─── STATIC PARAMS ─────────────────────────────────── */

export function generateStaticParams() {
  return Object.keys(posts).map((slug) => ({ slug }));
}

/* ─── METADATA ──────────────────────────────────────── */

export async function generateMetadata(
  { params }: { params: { slug: string } }
): Promise<Metadata> {
  const post = posts[params.slug];
  if (!post) return { title: "Post Not Found" };
  return {
    title: post.metaTitle
      ? { absolute: post.metaTitle }
      : { absolute: `${post.title}: OmniPriv Blog` },
    description: post.metaDescription ?? post.excerpt,
    alternates: { canonical: `/blog/${params.slug}` },
  };
}

/*
 * Product pages an article supports. Shown beside the article so readers can
 * move from the guide to the product, and so guides and product pages that
 * share a topic point at each other instead of competing.
 */
const PRODUCT_LINKS: Record<string, { href: string; label: string }[]> = {
  "ai-pam-solutions": [
    { href: "/ai-pam", label: "The AI-PAM engine" },
    { href: "/solutions/ai-pam-solutions", label: "AI PAM solutions" },
  ],
  "jit-access-guide": [{ href: "/platform/workflow-access-control", label: "Workflow & Access Control" }],
  "ssh-key-management": [{ href: "/platform/password-credential-management", label: "Credential Management" }],
  "soc2-pam-audit": [{ href: "/privileged-access-audit-compliance", label: "Audit & Compliance" }],
  "hipaa-pam-guide": [{ href: "/privileged-access-audit-compliance", label: "Audit & Compliance" }],
  "zero-trust-pam-guide": [{ href: "/platform/identity-security", label: "Identity security" }],
  "cicd-privileged-access": [{ href: "/solutions/machine-identity-security", label: "Machine identity security" }],
  "stale-privilege-accounts": [{ href: "/platform/identity-security", label: "Identity security" }],
  "pim-vs-pam-key-differences": [{ href: "/platform/identity-security", label: "Identity security" }],
  "pam-solution-features": [{ href: "/features", label: "All features" }],
  "pam-as-a-service": [{ href: "/enterprise", label: "Enterprise plans" }],
};

/* ─── PAGE ──────────────────────────────────────────── */

/** Up to three other posts: same category first, then the rest in list order. */
function relatedPosts(slug: string) {
  const current = posts[slug];
  const others = Object.entries(posts).filter(([s]) => s !== slug);
  const same = others.filter(([, p]) => p.category === current.category);
  const rest = others.filter(([, p]) => p.category !== current.category);
  return [...same, ...rest].slice(0, 3);
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = posts[params.slug];
  // Slugs are lowercase. Old or mistyped capitalisations (for example the
  // former /blog/OmniPriv-4-release) get a permanent redirect. Done here, not
  // in next.config.js, because config redirects match case-insensitively and
  // would loop.
  if (!post) {
    const lower = params.slug.toLowerCase();
    if (lower !== params.slug && posts[lower]) permanentRedirect(`/blog/${lower}`);
    notFound();
  }

  const fallback = {
    src: "/product/dashboard.png",
    alt: "OmniPriv privileged access management dashboard",
  };
  const cover = getCover(params.slug) ?? fallback;
  const toc = headingIds(post.content);
  const related = relatedPosts(params.slug);

  return (
    <div className="aip">
      <ReadingProgress targetId="article-body" />

      {/* Header: breadcrumb, title, summary and cover */}
      <section className={`relative overflow-hidden ${sectionLine}`}>
        <div className="aip-hero-grid pointer-events-none absolute inset-0" aria-hidden="true" />
        <div className="container-xl relative pt-10 pb-12 lg:pt-14 lg:pb-16">
          <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-1.5 text-[0.8125rem] text-slate-500 dark:text-slate-400">
            <Link href="/blog" className="inline-flex items-center gap-1.5 font-medium hover:text-[#0a1628] dark:hover:text-white transition-colors">
              <ArrowLeft className="w-3.5 h-3.5" aria-hidden="true" /> Blog
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" aria-hidden="true" />
            <span className="font-medium text-[#00667A] dark:text-[#7FE3F2]">{post.category}</span>
          </nav>

          <h1 className="op-h1 aip-h1 mt-6 max-w-5xl [text-wrap:balance]">{post.title}</h1>

          <div className="mt-10 grid items-center gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] lg:gap-12">
            <div className="min-w-0">
              <p className="text-[1.125rem] leading-[1.7] text-slate-600 dark:text-slate-300">{post.excerpt}</p>

              <div className="mt-7 flex items-center gap-3">
                <span className="inline-flex w-11 h-11 shrink-0 items-center justify-center rounded-full bg-[#00B8DB]/[0.12] text-[0.875rem] font-bold text-[#00667A] dark:text-[#7FE3F2]" aria-hidden="true">
                  {post.author.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase()}
                </span>
                <span className="min-w-0 text-[0.875rem]">
                  <span className="block font-semibold text-[#0a1628] dark:text-white">{post.author}</span>
                  {post.authorTitle && <span className="block text-slate-500 dark:text-slate-400">{post.authorTitle}</span>}
                </span>
              </div>

              <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-[0.875rem] text-slate-500 dark:text-slate-400">
                <span className="badge-cyan">{post.category}</span>
                <span className="inline-flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5" aria-hidden="true" />
                  {post.date}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5" aria-hidden="true" />
                  {post.readTime}
                </span>
              </div>
            </div>

            <div className={`relative w-full aspect-[2/1] rounded-3xl overflow-hidden border ${mediaBorder}`}>
              <Image
                src={cover.src}
                alt={cover.alt}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 640px"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Article body with a sticky table of contents */}
      <section className={sectionLine}>
        <div className="container-xl py-12 lg:py-16">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_16rem] xl:grid-cols-[minmax(0,1fr)_17rem] lg:gap-16">
            <article id="article-body" className="min-w-0 max-w-[46rem]">
              {toc.length > 1 && (
                <details className="mb-10 rounded-2xl border border-slate-900/[0.08] dark:border-white/[0.08] bg-slate-50 dark:bg-[#15171a] p-5 lg:hidden">
                  <summary className="cursor-pointer text-[0.9375rem] font-semibold text-[#0a1628] dark:text-white">On this page</summary>
                  <ol className="mt-3 space-y-2">
                    {toc.filter((t) => t.level === 2).map((t) => (
                      <li key={t.id}>
                        <a href={`#${t.id}`} className="text-[0.875rem] text-slate-600 dark:text-slate-400 hover:text-[#00667A] dark:hover:text-[#7FE3F2]">
                          {t.text}
                        </a>
                      </li>
                    ))}
                  </ol>
                </details>
              )}

              {renderArticle(post.content, toc)}

              {post.tags.length > 0 && (
                <div className="mt-14 flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border border-slate-900/[0.08] dark:border-white/[0.08] bg-white dark:bg-[#15171A] text-slate-600 dark:text-slate-400"
                    >
                      <Tag className="w-3 h-3" aria-hidden="true" /> {tag}
                    </span>
                  ))}
                </div>
              )}

              <div className={`mt-10 pt-8 border-t ${mediaBorder} flex flex-col sm:flex-row sm:items-center justify-between gap-6`}>
                <Link href="/blog" className={`inline-flex items-center gap-2 text-sm ${articleLink}`}>
                  <ArrowLeft className="w-4 h-4" aria-hidden="true" /> Back to all articles
                </Link>
                <div className="lg:hidden space-y-5">
                  {PRODUCT_LINKS[params.slug] && (
                    <div className="flex flex-wrap gap-x-5 gap-y-2">
                      {PRODUCT_LINKS[params.slug].map((l) => (
                        <Link key={l.href} href={l.href} className="op-link inline-flex items-center gap-1.5 text-[0.875rem] font-semibold">
                          {l.label}
                          <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                        </Link>
                      ))}
                    </div>
                  )}
                  <ShareRow title={post.title} />
                </div>
              </div>
            </article>

            <aside className="hidden lg:block">
              <div className="sticky top-28 space-y-8">
                <ArticleToc items={toc.filter((t) => t.level === 2)} />
                <ShareRow title={post.title} />
                {PRODUCT_LINKS[params.slug] && (
                  <div>
                    <div className="text-[0.8125rem] font-semibold text-[#0a1628] dark:text-white">In the product</div>
                    <ul className="mt-3 space-y-1.5">
                      {PRODUCT_LINKS[params.slug].map((l) => (
                        <li key={l.href}>
                          <Link href={l.href} className="op-link inline-flex items-center gap-1.5 text-[0.875rem] font-semibold group">
                            {l.label}
                            <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden="true" />
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                <div className="rounded-2xl border border-[#00B8DB]/25 bg-[#00B8DB]/[0.05] p-5">
                  <div className="op-card-title text-[0.9375rem]">See it on your systems</div>
                  <p className="mt-2 text-[0.8125rem] leading-relaxed text-slate-600 dark:text-slate-400">A walkthrough shows each control against your own environment.</p>
                  <Link href="/demo" className="mt-4 op-link inline-flex items-center gap-1.5 text-[0.875rem] font-semibold group">
                    Request a Demo
                    <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden="true" />
                  </Link>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* Related articles */}
      {related.length > 0 && (
        <section className={`op-band-muted bg-slate-50 ${sectionLine}`}>
          <div className="container-xl py-14 lg:py-16">
            <div className="flex items-end justify-between gap-4">
              <h2 className="op-h3">Keep reading</h2>
              <Link href="/blog" className="op-link inline-flex items-center gap-1.5 text-[0.875rem] font-semibold group">
                All articles
                <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden="true" />
              </Link>
            </div>
            <ul className="mt-7 grid gap-4 md:grid-cols-3">
              {related.map(([slug, p]) => {
                const c = getCover(slug) ?? fallback;
                return (
                  <li key={slug} className="min-w-0">
                    <Link href={`/blog/${slug}`} className="aip-card group flex h-full flex-col overflow-hidden rounded-3xl border">
                      <span className="relative block aspect-[2/1] overflow-hidden bg-slate-100 dark:bg-white/[0.04]">
                        <Image src={c.src} alt={c.alt} fill sizes="(max-width: 768px) 100vw, 400px" className="object-cover transition-transform duration-500 group-hover:scale-[1.03]" />
                      </span>
                      <span className="flex flex-1 flex-col p-5">
                        <span className="text-[0.75rem] font-semibold text-[#00667A] dark:text-[#7FE3F2]">{p.category}</span>
                        <span className="op-card-title mt-2 text-[1rem] leading-snug">{p.title}</span>
                        <span className="mt-auto pt-4 flex items-center gap-3 text-[0.75rem] text-slate-500 dark:text-slate-400">
                          <span>{p.date}</span>
                          <span aria-hidden="true">·</span>
                          <span>{p.readTime}</span>
                        </span>
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </section>
      )}

      <ClosingBand
        title="See these controls against your own environment"
        lead="Nine modules. One audit trail."
        body={[
          "The platform index describes what each capability module does; a walkthrough shows what it looks like against your systems.",
        ]}
        primary={{ href: "/demo", label: "Request a Demo" }}
        secondary={{ href: "/platform", label: "Explore the Platform" }}
      />
    </div>
  );
}
