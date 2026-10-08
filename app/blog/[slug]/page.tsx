import type { Metadata } from "next";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Clock, Calendar, Tag } from "lucide-react";

import CtaBand from "@/components/sections/CtaBand";
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
function renderArticle(markdown: string): React.ReactNode[] {
  const lines = markdown.trim().split("\n");
  const nodes: React.ReactNode[] = [];
  let i = 0;

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
          className="mt-6 first:mt-0 overflow-x-auto rounded-xl border border-slate-900/[0.08] dark:border-white/[0.08] bg-slate-50 dark:bg-[#0F2140] p-4 font-mono text-sm leading-[1.7] text-[#0a1628] dark:text-slate-200"
        >
          <code>{code.join("\n")}</code>
        </pre>
      );
      continue;
    }

    // Headings
    const heading = line.match(/^(#{2,4})\s+(.*)$/);
    if (heading) {
      nodes.push(
        heading[1] === "##" ? (
          <h2 key={key} className={articleH2}>
            {renderInline(heading[2])}
          </h2>
        ) : (
          <h3 key={key} className={articleH3}>
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
  };
}

/* ─── PAGE ──────────────────────────────────────────── */

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = posts[params.slug];
  if (!post) notFound();

  const cover = getCover(params.slug) ?? {
    src: "/product/dashboard.png",
    alt: "OmniPriv privileged access management dashboard",
  };

  return (
    <>
      {/* Header: full-width title above the article summary and cover */}
      <section className="pt-12 lg:pt-16">
        <div className="container-xl">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-[#0a1628] dark:hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" aria-hidden="true" /> Back to Blog
          </Link>

          <h1 className="op-h1 mt-6 mb-8">{post.title}</h1>

          <div className="grid items-center gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] lg:gap-12">
            <div>
              <p className="op-lede">{post.excerpt}</p>

              <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-3 text-sm text-slate-500 dark:text-slate-400">
                <span className="badge-cyan">{post.category}</span>
                <span className="inline-flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5" aria-hidden="true" />
                  {post.date}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5" aria-hidden="true" />
                  {post.readTime}
                </span>
                <span>
                  By <span className="font-semibold text-[#0a1628] dark:text-white">{post.author}</span>
                  {post.authorTitle && <>, {post.authorTitle}</>}
                </span>
              </div>
            </div>

            <div className={`relative w-full aspect-[2/1] rounded-2xl overflow-hidden border ${mediaBorder}`}>
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

      {/* Article body */}
      <section className="section-padding !pt-12 lg:!pt-14">
        <div className="container-xl">
          <article className="max-w-3xl">
            {renderArticle(post.content)}

            {post.tags.length > 0 && (
              <div className="mt-14 flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border border-slate-900/[0.08] dark:border-white/[0.08] bg-white dark:bg-[#0F2140] text-slate-600 dark:text-slate-400"
                  >
                    <Tag className="w-3 h-3" aria-hidden="true" /> {tag}
                  </span>
                ))}
              </div>
            )}

            <div className={`mt-10 pt-8 border-t ${mediaBorder}`}>
              <Link href="/blog" className={`inline-flex items-center gap-2 text-sm ${articleLink}`}>
                <ArrowLeft className="w-4 h-4" aria-hidden="true" /> Back to all articles
              </Link>
            </div>
          </article>
        </div>
      </section>

      {/* Closing, top level so CtaBand keeps its full-bleed dark surface. */}
      <CtaBand
        title="See these controls against your own environment"
        body={[
          "The platform index describes what each capability module does; a walkthrough shows what it looks like against your systems.",
        ]}
        kicker="Nine modules. One audit trail."
        primary={{ href: "/demo", label: "Request a Demo" }}
        secondary={{ href: "/platform", label: "Explore the Platform" }}
      />
    </>
  );
}
