import type { Metadata } from "next";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Clock, Calendar, Tag, ArrowRight } from "lucide-react";

import { posts } from "@/lib/blog-data";

/* ─── INLINE MARKDOWN RENDERER ─────────────────────── */

function renderInline(text: string): React.ReactNode {
  // Split on [text](url) patterns
  const parts = text.split(/(\[[^\]]+\]\([^)]+\))/g);
  if (parts.length === 1) return text;
  return parts.map((part, i) => {
    const match = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (match) {
      return (
        <Link key={i} href={match[2]} className="text-[#00B8FF] hover:underline">
          {match[1]}
        </Link>
      );
    }
    return <span key={i}>{part}</span>;
  });
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
      : { absolute: `${post.title} — OmniPriv Blog` },
    description: post.metaDescription ?? post.excerpt,
  };
}

/* ─── PAGE ──────────────────────────────────────────── */

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = posts[params.slug];
  if (!post) notFound();

  // Split content into sections by ## headings
  const sections = post.content.trim().split(/\n(?=## )/);

  return (
    <>
      {/* Hero */}
      <section className="relative pt-16 pb-14 border-b border-white/[0.04] overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-40" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#030711]/40 via-[#030711]/80 to-[#030711]" />
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] pointer-events-none"
          style={{ background: "radial-gradient(ellipse at top, rgba(0,184,255,0.08) 0%, transparent 60%)" }}
        />
        <div className="container-xl relative z-10 max-w-3xl mx-auto">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-[#00B8FF] transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Blog
          </Link>

          <div className="flex flex-wrap gap-2 mb-5">
            <span className="badge-cyan">{post.category}</span>
          </div>

          <h1
            className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white leading-tight mb-6"
            style={{ fontFamily: "var(--font-syne)" }}
          >
            {post.title}
          </h1>

          <p className="text-lg text-slate-400 leading-relaxed mb-8">{post.excerpt}</p>

          <div className="flex flex-wrap items-center gap-5 text-sm text-slate-500">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#00B8FF]/30 to-[#6366f1]/20 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                {post.author.charAt(0)}
              </div>
              <div>
                <div className="text-white font-semibold text-sm">{post.author}</div>
                {post.authorTitle && <div className="text-xs text-slate-500">{post.authorTitle}</div>}
              </div>
            </div>
            <div className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5" />
              {post.date}
            </div>
            <div className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" />
              {post.readTime}
            </div>
          </div>

          {post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-6">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border border-white/[0.08] bg-white/[0.04] text-slate-400"
                >
                  <Tag className="w-2.5 h-2.5" /> {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Article Body */}
      <section className="section-padding">
        <div className="container-xl max-w-3xl mx-auto">
          <div className="space-y-10">
            {sections.map((section, i) => {
              const lines = section.trim().split("\n");
              const heading = lines[0].replace(/^##\s*/, "");
              const body = lines.slice(1).join("\n").trim();
              const paragraphs = body.split(/\n\n+/).filter(Boolean);

              return (
                <div key={i}>
                  {heading && (
                    <h2
                      className="text-xl md:text-2xl font-extrabold text-white mb-5"
                      style={{ fontFamily: "var(--font-syne)" }}
                    >
                      {heading}
                    </h2>
                  )}
                  <div className="space-y-4">
                    {paragraphs.map((para, j) => {
                      // Image pattern: ![alt](src)
                      const imageMatch = para.trim().match(/^!\[(.+?)\]\((.+?)\)$/);
                      if (imageMatch) {
                        return (
                          <div key={j} className="my-6 rounded-xl overflow-hidden border border-white/[0.07]">
                            <Image
                              src={imageMatch[2]}
                              alt={imageMatch[1]}
                              width={820}
                              height={420}
                              className="w-full h-auto"
                              unoptimized
                            />
                          </div>
                        );
                      }
                      // List pattern: block of lines all starting with "- "
                      const listLines = para.split("\n").filter(Boolean);
                      if (listLines.length > 0 && listLines.every((l) => l.trim().startsWith("- "))) {
                        return (
                          <ul key={j} className="space-y-2.5 ml-1">
                            {listLines.map((item, k) => (
                              <li key={k} className="flex items-start gap-3 text-slate-400 leading-relaxed">
                                <span className="mt-2 w-1.5 h-1.5 rounded-full bg-[#00B8FF] flex-shrink-0" />
                                {renderInline(item.trim().slice(2))}
                              </li>
                            ))}
                          </ul>
                        );
                      }
                      // Bold intro pattern: **Label** rest
                      const boldMatch = para.match(/^\*\*(.+?)\*\*\s*([\s\S]*)/);
                      if (boldMatch) {
                        return (
                          <p key={j} className="text-slate-300 leading-relaxed">
                            <strong className="text-white font-semibold">{boldMatch[1]}</strong>
                            {boldMatch[2] ? <> {renderInline(boldMatch[2])}</> : ""}
                          </p>
                        );
                      }
                      return (
                        <p key={j} className="text-slate-400 leading-relaxed">
                          {renderInline(para)}
                        </p>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>

          {/* CTA */}
          <div className="mt-16 p-8 rounded-2xl border border-[#00B8FF]/15 bg-gradient-to-br from-[#0A1628] to-[#030711]">
            <h3
              className="text-lg font-extrabold text-white mb-3"
              style={{ fontFamily: "var(--font-syne)" }}
            >
              See OmniPriv in Action
            </h3>
            <p className="text-slate-400 text-sm leading-relaxed mb-5">
              Talk to our team to see how OmniPriv addresses the challenges in this article for your specific environment.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/demo" className="btn-primary text-sm">
                Request a Demo <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href="/demo" className="btn-secondary text-sm">
                Contact Sales
              </Link>
            </div>
          </div>

          {/* Back */}
          <div className="mt-10 pt-8 border-t border-white/[0.06]">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-[#00B8FF] transition-colors"
            >
              <ArrowLeft className="w-4 h-4" /> Back to all articles
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
